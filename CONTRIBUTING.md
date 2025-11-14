# Contributing to Adaptify

Thank you for your interest in contributing to Adaptify! This document provides guidelines and instructions for development.

## Development Setup

### Installing the Dev Extension

1. Clone this repository:
   ```bash
   git clone https://github.com/lodev09/adaptify-zed.git
   ```

2. In Zed, open the extensions panel:
   - Open the command palette (`cmd+shift+p` on macOS, `ctrl+shift+p` on Linux/Windows)
   - Type "extensions" and select "zed: extensions"

3. Click the "Install Dev Extension" button at the top of the extensions panel

4. Select the cloned `adaptify-zed` directory

5. The theme will be installed and available in the theme selector

### Making Changes

After making edits to the theme files in the `themes/` directory, Zed will automatically reload the theme. If needed, you can manually reload by reselecting your Adaptify variant from the theme selector.

## Project Structure

```
adaptify-zed/
├── themes/           # Theme definition files
│   └── adaptify.json
├── assets/           # Screenshots and images
├── extension.toml    # Extension metadata
└── README.md
```

## Theme Variants

The theme includes four variants that should be maintained consistently:

- **Adaptify Dark** - Main dark theme
- **Adaptify Dark (Blurred)** - Dark with translucent backgrounds
- **Adaptify Darker** - Deeper blacks variant
- **Adaptify Darker (Blurred)** - Darker with translucent backgrounds

When making changes, ensure all variants are updated appropriately.

## Submitting Changes

1. Fork the repository
2. Create a new branch for your changes
3. Make your changes following the guidelines above
4. Test all theme variants thoroughly
5. Submit a pull request with a clear description of your changes

## Questions?

Feel free to open an issue if you have any questions or need help with development.
