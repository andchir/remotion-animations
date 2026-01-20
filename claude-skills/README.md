# Claude Code Skills for Remotion Animations

This directory contains Claude Code skills that help with creating and managing Remotion animations.

## Available Skills

### 1. video-viewing
**Location:** `claude-skills/video-viewing/`

Download, view, and analyze video files from direct URLs. This skill provides tools for:
- Downloading videos from direct links
- Extracting video metadata (duration, resolution, codec, frame rate)
- Extracting frames for visual analysis
- Frame-by-frame video examination

**Use when:** You need to download a video file, extract frames, or get video information.

**Quick usage:**
```bash
python scripts/download_video.py "VIDEO_URL" -f
```

See [video-viewing/SKILL.md](video-viewing/SKILL.md) for detailed documentation.

---

### 2. text-animation-copier
**Location:** `claude-skills/text-animation-copier/`

Copy and recreate text animations from video examples using Remotion. This skill provides a comprehensive workflow for:
- Analyzing text animations in videos
- Identifying animation timing, effects, and styling
- Generating Remotion React components
- Implementing complex multi-stage animations
- Testing and refining animations

**Use when:** You need to replicate a text animation from a video example.

**Quick workflow:**
1. Download video and extract frames (use `video-viewing` skill)
2. Analyze animation properties from frames
3. Generate Remotion component with timing and effects
4. Test in Remotion Studio
5. Render final animation

See [text-animation-copier/SKILL.md](text-animation-copier/SKILL.md) for detailed documentation and [text-animation-copier/EXAMPLES.md](text-animation-copier/EXAMPLES.md) for practical examples.

---

## Using Skills with Claude Code

Skills are designed to be invoked by Claude Code to provide specialized capabilities. When working with Claude:

1. **Reference skills in prompts**: "Use the text-animation-copier skill to recreate this animation"
2. **Skills work together**: Use `video-viewing` to download videos, then `text-animation-copier` to create animations
3. **Follow skill workflows**: Each skill provides step-by-step processes

## External Skills Referenced

### remotion-best-practices
**Source:** [connorads/dotfiles](https://github.com/connorads/dotfiles/blob/master/.claude/skills/remotion-best-practices/SKILL.md)

Comprehensive best practices for working with Remotion, including:
- Core concepts (compositions, animations, timing)
- Media handling (images, video, audio, fonts)
- Advanced techniques (3D, charts, text measurement)
- TailwindCSS integration

**Use when:** You need specific Remotion implementation patterns or advanced features.

---

## Project Structure

```
claude-skills/
├── README.md                           # This file
├── video-viewing/
│   └── SKILL.md                        # Video download and analysis skill
└── text-animation-copier/
    ├── SKILL.md                        # Text animation copying workflow
    └── EXAMPLES.md                     # Practical examples and patterns
```

## Scripts

Supporting scripts are located in the `scripts/` directory:

- **`scripts/download_video.py`**: Video download and frame extraction utility (used by video-viewing skill)

---

## Contributing

When adding new skills:

1. Create a new directory under `claude-skills/`
2. Add a `SKILL.md` file with frontmatter:
   ```yaml
   ---
   name: skill-name
   description: Brief description of what the skill does
   ---
   ```
3. Document the skill workflow, commands, and examples
4. Update this README with the new skill
5. Add any required scripts to `scripts/` directory

---

## License

MIT - See the project root LICENSE file for details.
