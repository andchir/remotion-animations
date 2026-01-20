#!/usr/bin/env python3
"""
Video Download and Analysis Script

Downloads videos from direct URLs and optionally extracts frames for analysis.
Part of the video-viewing and text-animation-copier skills.
"""

import argparse
import os
import sys
import subprocess
from pathlib import Path
from urllib.parse import urlparse

try:
    import requests
except ImportError:
    print("Installing required package: requests")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "requests"])
    import requests


def get_output_dir(custom_dir=None):
    """Get the output directory, preferring /mnt/user-data/outputs/ if available."""
    if custom_dir:
        return Path(custom_dir)

    preferred_dir = Path("/mnt/user-data/outputs")
    if preferred_dir.exists():
        return preferred_dir

    return Path.cwd()


def download_video(url, output_dir, filename=None):
    """Download video from URL with progress indication."""
    try:
        # Get filename from URL if not specified
        if not filename:
            parsed_url = urlparse(url)
            filename = Path(parsed_url.path).name
            if not filename or '.' not in filename:
                filename = "video.mp4"

        # Ensure proper extension
        if not any(filename.endswith(ext) for ext in ['.mp4', '.webm', '.mkv', '.avi', '.mov', '.m4v', '.wmv', '.flv']):
            filename += '.mp4'

        output_path = output_dir / filename

        print(f"Downloading video from: {url}")
        print(f"Saving to: {output_path}")

        # Download with streaming
        response = requests.get(url, stream=True)
        response.raise_for_status()

        total_size = int(response.headers.get('content-length', 0))
        block_size = 8192
        downloaded = 0

        with open(output_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=block_size):
                if chunk:
                    f.write(chunk)
                    downloaded += len(chunk)

                    if total_size > 0:
                        percent = (downloaded / total_size) * 100
                        print(f"\rProgress: {percent:.1f}% ({downloaded}/{total_size} bytes)", end='')

        print(f"\n✓ Video downloaded successfully: {output_path}")
        return output_path

    except Exception as e:
        print(f"✗ Error downloading video: {e}")
        sys.exit(1)


def get_video_info(video_path):
    """Get video metadata using ffprobe."""
    try:
        cmd = [
            'ffprobe',
            '-v', 'quiet',
            '-print_format', 'json',
            '-show_format',
            '-show_streams',
            str(video_path)
        ]

        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        import json
        data = json.loads(result.stdout)

        # Extract video stream info
        video_stream = next((s for s in data['streams'] if s['codec_type'] == 'video'), None)

        if video_stream:
            print("\n📹 Video Information:")
            print(f"  Duration: {float(data['format'].get('duration', 0)):.2f} seconds")
            print(f"  Resolution: {video_stream.get('width')}x{video_stream.get('height')}")
            print(f"  Codec: {video_stream.get('codec_name')}")
            print(f"  Frame Rate: {video_stream.get('r_frame_rate')}")
            print(f"  File Size: {int(data['format'].get('size', 0)) / (1024*1024):.2f} MB")

        return data

    except FileNotFoundError:
        print("⚠ ffprobe not found. Install ffmpeg to get video information.")
        return None
    except Exception as e:
        print(f"⚠ Error getting video info: {e}")
        return None


def extract_frames(video_path, output_dir, fps=1):
    """Extract frames from video at specified FPS."""
    try:
        frames_dir = output_dir / f"{video_path.stem}_frames"
        frames_dir.mkdir(exist_ok=True)

        print(f"\n🎞️  Extracting frames at {fps} fps...")
        print(f"  Output directory: {frames_dir}")

        cmd = [
            'ffmpeg',
            '-i', str(video_path),
            '-vf', f'fps={fps}',
            '-y',  # Overwrite output files
            str(frames_dir / 'frame-%04d.png')
        ]

        result = subprocess.run(cmd, capture_output=True, text=True)

        if result.returncode == 0:
            # Count extracted frames
            frame_count = len(list(frames_dir.glob('frame-*.png')))
            print(f"✓ Extracted {frame_count} frames to: {frames_dir}")
            return frames_dir
        else:
            print(f"✗ Error extracting frames: {result.stderr}")
            return None

    except FileNotFoundError:
        print("✗ ffmpeg not found. Install ffmpeg to extract frames.")
        print("  Ubuntu/Debian: sudo apt-get install ffmpeg")
        print("  macOS: brew install ffmpeg")
        return None
    except Exception as e:
        print(f"✗ Error extracting frames: {e}")
        return None


def main():
    parser = argparse.ArgumentParser(
        description='Download and analyze video files from direct URLs',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog='''
Examples:
  # Download video
  %(prog)s "https://example.com/video.mp4"

  # Download and extract frames
  %(prog)s "https://example.com/video.mp4" -f

  # Get video info only
  %(prog)s "https://example.com/video.mp4" -i

  # Custom output directory and filename
  %(prog)s "https://example.com/video.mp4" -o /tmp -n my_video
        '''
    )

    parser.add_argument('url', help='Direct URL to video file')
    parser.add_argument('-o', '--output', help='Output directory (default: /mnt/user-data/outputs or current directory)')
    parser.add_argument('-n', '--name', help='Custom filename (without extension)')
    parser.add_argument('-f', '--frames', action='store_true', help='Extract frames from video')
    parser.add_argument('-i', '--info', action='store_true', help='Get video information only (no download)')
    parser.add_argument('--fps', type=float, default=1.0, help='Frames per second to extract (default: 1)')

    args = parser.parse_args()

    # Prepare output directory
    output_dir = get_output_dir(args.output)
    output_dir.mkdir(parents=True, exist_ok=True)

    # Handle info-only mode
    if args.info:
        # For info mode, we need to download temporarily
        print("Fetching video information...")
        temp_path = download_video(args.url, output_dir, args.name)
        get_video_info(temp_path)
        return

    # Download video
    video_path = download_video(args.url, output_dir, args.name)

    # Get video info
    get_video_info(video_path)

    # Extract frames if requested
    if args.frames:
        extract_frames(video_path, output_dir, args.fps)


if __name__ == '__main__':
    main()
