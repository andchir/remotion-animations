#!/usr/bin/env python3
"""
Video Downloader and Analyzer

Download video files from direct URLs and optionally extract frames for analysis.
Supports: mp4, webm, mkv, avi, mov, m4v, wmv, flv

Usage:
    python download_video.py "https://example.com/video.mp4"
    python download_video.py "URL" -o /output/path -n my_video
    python download_video.py "URL" -f  # Extract frames
    python download_video.py "URL" -i  # Get info only
"""

import argparse
import os
import sys
import subprocess
import json
import shutil
from pathlib import Path
from urllib.parse import urlparse, unquote

# Try to import requests, install if not available
try:
    import requests
except ImportError:
    print("Installing requests library...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "requests", "-q"])
    import requests

# Supported video formats
SUPPORTED_FORMATS = {'.mp4', '.webm', '.mkv', '.avi', '.mov', '.m4v', '.wmv', '.flv'}

# Default output directory
DEFAULT_OUTPUT_DIR = "/mnt/user-data/outputs"


def get_default_output_dir():
    """Get the default output directory, falling back to current directory if needed."""
    if os.path.exists(DEFAULT_OUTPUT_DIR) and os.access(DEFAULT_OUTPUT_DIR, os.W_OK):
        return DEFAULT_OUTPUT_DIR
    return os.getcwd()


def get_filename_from_url(url):
    """Extract filename from URL."""
    parsed = urlparse(url)
    path = unquote(parsed.path)
    filename = os.path.basename(path)

    if not filename or not any(filename.lower().endswith(ext) for ext in SUPPORTED_FORMATS):
        # Generate a default name if none found
        filename = "video.mp4"

    return filename


def get_file_extension(url, content_type=None):
    """Get file extension from URL or content type."""
    # First try from URL
    parsed = urlparse(url)
    path = unquote(parsed.path)
    _, ext = os.path.splitext(path)

    if ext.lower() in SUPPORTED_FORMATS:
        return ext.lower()

    # Try from content type
    if content_type:
        content_type = content_type.lower()
        if 'mp4' in content_type:
            return '.mp4'
        elif 'webm' in content_type:
            return '.webm'
        elif 'matroska' in content_type or 'mkv' in content_type:
            return '.mkv'
        elif 'avi' in content_type:
            return '.avi'
        elif 'quicktime' in content_type or 'mov' in content_type:
            return '.mov'

    # Default to mp4
    return '.mp4'


def download_video(url, output_dir, custom_name=None, show_progress=True):
    """Download a video file from a URL."""
    print(f"Downloading video from: {url}")

    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)

    # Start download with streaming
    response = requests.get(url, stream=True, timeout=30)
    response.raise_for_status()

    # Get content info
    content_type = response.headers.get('Content-Type', '')
    content_length = response.headers.get('Content-Length')
    total_size = int(content_length) if content_length else None

    # Determine filename
    if custom_name:
        ext = get_file_extension(url, content_type)
        filename = f"{custom_name}{ext}"
    else:
        filename = get_filename_from_url(url)

    output_path = os.path.join(output_dir, filename)

    # Download with progress
    downloaded = 0
    chunk_size = 8192

    with open(output_path, 'wb') as f:
        for chunk in response.iter_content(chunk_size=chunk_size):
            if chunk:
                f.write(chunk)
                downloaded += len(chunk)

                if show_progress and total_size:
                    percent = (downloaded / total_size) * 100
                    mb_downloaded = downloaded / (1024 * 1024)
                    mb_total = total_size / (1024 * 1024)
                    print(f"\rProgress: {percent:.1f}% ({mb_downloaded:.1f}/{mb_total:.1f} MB)", end='', flush=True)

    if show_progress:
        print()  # New line after progress

    file_size = os.path.getsize(output_path)
    print(f"Downloaded: {output_path} ({file_size / (1024 * 1024):.2f} MB)")

    return output_path


def check_ffmpeg():
    """Check if ffmpeg and ffprobe are available."""
    ffmpeg_available = shutil.which('ffmpeg') is not None
    ffprobe_available = shutil.which('ffprobe') is not None
    return ffmpeg_available, ffprobe_available


def get_video_info(video_path):
    """Get video metadata using ffprobe."""
    _, ffprobe_available = check_ffmpeg()

    if not ffprobe_available:
        print("Warning: ffprobe not found. Install ffmpeg for detailed video info.")
        # Return basic file info
        return {
            'file_size': os.path.getsize(video_path),
            'filename': os.path.basename(video_path)
        }

    try:
        cmd = [
            'ffprobe',
            '-v', 'quiet',
            '-print_format', 'json',
            '-show_format',
            '-show_streams',
            video_path
        ]

        result = subprocess.run(cmd, capture_output=True, text=True, timeout=30)

        if result.returncode != 0:
            print(f"ffprobe error: {result.stderr}")
            return None

        data = json.loads(result.stdout)

        # Extract useful information
        info = {
            'filename': os.path.basename(video_path),
            'file_size': os.path.getsize(video_path)
        }

        # Get format info
        if 'format' in data:
            fmt = data['format']
            info['duration'] = float(fmt.get('duration', 0))
            info['format_name'] = fmt.get('format_name', 'unknown')
            info['bitrate'] = int(fmt.get('bit_rate', 0)) if fmt.get('bit_rate') else None

        # Get video stream info
        for stream in data.get('streams', []):
            if stream.get('codec_type') == 'video':
                info['width'] = stream.get('width')
                info['height'] = stream.get('height')
                info['video_codec'] = stream.get('codec_name')
                info['frame_rate'] = stream.get('r_frame_rate')
                break

        # Get audio stream info
        for stream in data.get('streams', []):
            if stream.get('codec_type') == 'audio':
                info['audio_codec'] = stream.get('codec_name')
                info['audio_channels'] = stream.get('channels')
                info['sample_rate'] = stream.get('sample_rate')
                break

        return info

    except subprocess.TimeoutExpired:
        print("ffprobe timed out")
        return None
    except json.JSONDecodeError:
        print("Failed to parse ffprobe output")
        return None
    except Exception as e:
        print(f"Error getting video info: {e}")
        return None


def print_video_info(info):
    """Print video information in a readable format."""
    if not info:
        print("No video information available.")
        return

    print("\n=== Video Information ===")
    print(f"Filename: {info.get('filename', 'unknown')}")
    print(f"File Size: {info.get('file_size', 0) / (1024 * 1024):.2f} MB")

    if 'duration' in info:
        duration = info['duration']
        minutes = int(duration // 60)
        seconds = int(duration % 60)
        print(f"Duration: {minutes}:{seconds:02d}")

    if 'width' in info and 'height' in info:
        print(f"Resolution: {info['width']}x{info['height']}")

    if 'video_codec' in info:
        print(f"Video Codec: {info['video_codec']}")

    if 'frame_rate' in info:
        print(f"Frame Rate: {info['frame_rate']}")

    if 'audio_codec' in info:
        print(f"Audio Codec: {info['audio_codec']}")

    if 'bitrate' in info and info['bitrate']:
        print(f"Bitrate: {info['bitrate'] // 1000} kbps")

    print("=" * 25)


def extract_frames(video_path, output_dir=None, num_frames=5):
    """Extract key frames from a video for analysis."""
    ffmpeg_available, _ = check_ffmpeg()

    if not ffmpeg_available:
        print("Error: ffmpeg not found. Please install ffmpeg to extract frames.")
        print("  Ubuntu/Debian: sudo apt-get install ffmpeg")
        print("  macOS: brew install ffmpeg")
        return []

    # Get video info for duration
    info = get_video_info(video_path)
    if not info or 'duration' not in info:
        print("Could not determine video duration. Extracting first frame only.")
        num_frames = 1
        duration = 1
    else:
        duration = info['duration']

    # Determine output directory for frames
    if output_dir is None:
        output_dir = os.path.dirname(video_path)

    video_name = Path(video_path).stem
    frames_dir = os.path.join(output_dir, f"{video_name}_frames")
    os.makedirs(frames_dir, exist_ok=True)

    # Calculate frame timestamps
    if duration > 0 and num_frames > 1:
        interval = duration / (num_frames + 1)
        timestamps = [interval * (i + 1) for i in range(num_frames)]
    else:
        timestamps = [0]

    extracted_frames = []

    print(f"Extracting {len(timestamps)} frames...")

    for i, timestamp in enumerate(timestamps):
        output_file = os.path.join(frames_dir, f"frame_{i + 1:03d}.jpg")

        cmd = [
            'ffmpeg',
            '-ss', str(timestamp),
            '-i', video_path,
            '-vframes', '1',
            '-q:v', '2',
            '-y',  # Overwrite
            output_file
        ]

        try:
            result = subprocess.run(cmd, capture_output=True, timeout=30)
            if result.returncode == 0 and os.path.exists(output_file):
                extracted_frames.append(output_file)
                print(f"  Extracted: {output_file} (at {timestamp:.1f}s)")
            else:
                print(f"  Failed to extract frame at {timestamp:.1f}s")
        except subprocess.TimeoutExpired:
            print(f"  Timeout extracting frame at {timestamp:.1f}s")
        except Exception as e:
            print(f"  Error extracting frame: {e}")

    print(f"\nExtracted {len(extracted_frames)} frames to: {frames_dir}")
    return extracted_frames


def get_video_info_from_url(url):
    """Get video information from URL without downloading."""
    print(f"Getting video info from: {url}")

    try:
        # Use HEAD request first to check availability
        response = requests.head(url, timeout=10, allow_redirects=True)
        response.raise_for_status()

        content_type = response.headers.get('Content-Type', '')
        content_length = response.headers.get('Content-Length')

        info = {
            'url': url,
            'content_type': content_type,
            'filename': get_filename_from_url(url)
        }

        if content_length:
            info['file_size'] = int(content_length)
            print(f"\nFile: {info['filename']}")
            print(f"Size: {int(content_length) / (1024 * 1024):.2f} MB")
            print(f"Type: {content_type}")
        else:
            print(f"\nFile: {info['filename']}")
            print(f"Type: {content_type}")
            print("Size: Unknown (server did not provide Content-Length)")

        return info

    except requests.exceptions.RequestException as e:
        print(f"Error getting video info: {e}")
        return None


def main():
    parser = argparse.ArgumentParser(
        description='Download and analyze video files from direct URLs',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s "https://example.com/video.mp4"
  %(prog)s "https://example.com/video.mp4" -o /output/path
  %(prog)s "https://example.com/video.mp4" -n my_video
  %(prog)s "https://example.com/video.mp4" -f  # Extract frames
  %(prog)s "https://example.com/video.mp4" -i  # Get info only
        """
    )

    parser.add_argument('url', help='Direct URL to the video file')
    parser.add_argument('-o', '--output', help='Output directory', default=None)
    parser.add_argument('-n', '--name', help='Custom filename (without extension)', default=None)
    parser.add_argument('-f', '--frames', action='store_true', help='Extract frames for analysis')
    parser.add_argument('-i', '--info', action='store_true', help='Get video info only (no download)')
    parser.add_argument('--num-frames', type=int, default=5, help='Number of frames to extract (default: 5)')

    args = parser.parse_args()

    # Validate URL
    if not args.url.startswith(('http://', 'https://')):
        print("Error: URL must start with http:// or https://")
        sys.exit(1)

    # Info only mode
    if args.info:
        get_video_info_from_url(args.url)
        sys.exit(0)

    # Determine output directory
    output_dir = args.output if args.output else get_default_output_dir()

    try:
        # Download the video
        video_path = download_video(args.url, output_dir, args.name)

        # Get and display video info
        info = get_video_info(video_path)
        print_video_info(info)

        # Extract frames if requested
        if args.frames:
            frames = extract_frames(video_path, output_dir, args.num_frames)
            if frames:
                print("\nFrames extracted successfully. You can now analyze these images.")

        print(f"\nVideo saved to: {video_path}")

    except requests.exceptions.RequestException as e:
        print(f"Error downloading video: {e}")
        sys.exit(1)
    except KeyboardInterrupt:
        print("\nDownload cancelled.")
        sys.exit(1)
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)


if __name__ == '__main__':
    main()
