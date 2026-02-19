---
in:
  - "[[Personal Blog]]"
---

I enjoy tinkering with my setup, and it's more than a hobby — it's how I stay fast. Tmux lets me jump between project sessions instantly, and neovim is configured so I can navigate within a repo the same way, fuzzy searching by filename or string. The catch is I work across two machines, and I want the setup that makes me fast on one to be available on the other.

The problem is that every tool I use scatters its configuration somewhere under $HOME. My shell, tiling window manager, text editor, they all have their own conventions. Most land in $HOME/.config, but not all; tmux, for example, defaults to $HOME/.tmux.conf.

What I need is version control over these files, with the ability to opt in per-tool. Not everything that drops a config directory in $HOME is worth tracking, I’d like to be a bit more selective. That rules out the “obvious” shortcut of initializing $HOME as a git repo and ignoring everything I don’t care about as it’s messy and backwards.

I first knew this was becoming a problem when my original .vimrc started getting out of control, back then it was just a single file, it has grown substantially since then. After torturing myself for awhile I decided I’d had enough.

**Requirements**

  1. Files are edited in one place. No manually propagating changes across the filesystem.
  2. Syncing changes between machines is done through a normal git push/pull workflow.
  3. Tools are opted in individually; not everything under $HOME needs to be tracked.
  4. Setting up a new machine should be fast, ideally a single script.

Before landing on my current setup, I tried a different approach entirely. I came across a HackerNews thread [1] and an accompanying Atlassian tutorial [2] describing a bare git repo method:

> The technique consists in storing a Git bare repository in a side folder (like $HOME/.cfg or $HOME/.myconfig) using a specially crafted alias so that commands are run against that repository and not the usual .git local folder, which would interfere with any other Git repositories around.

Bare repos separate the git internals from the files you’re actually tracking, which I found confusing at first. It clicked for me after watching this talk [3] not about git at all, but about hidden context in functions. The presenter’s point is that inputs and outputs aren’t always visible in a function signature; some are implicit. A bare repo surfaces one of git’s hidden inputs: your working directory. Instead of inferring it from where you are, you declare it explicitly.

In practice though, the method had some friction:

1. New files don’t show up in `config status` automatically — they have to be explicitly added, unlike a normal repo.
2. The custom alias means a completely different set of commands. I might not touch my dotfiles for months, and when I do I’ve forgotten what the alias even was.

It technically worked, but it was enough of a deviation from my normal git workflow that I never felt comfortable with it. One thing the HackerNews thread touted as a selling point: no symlinks required. At the time I had no idea what symlinks were, let alone why that mattered.

### Symlinks
A symlink is a special file that acts as a pointer to another file or directory. The symlink can live at one path while the actual file lives somewhere else entirely — applications that read the symlink see it as if the file were right there. You create one like this: `ln -s /path/to/actual/file /path/to/symlink`

This is exactly what we need. Config files can live in a normal git repo wherever is convenient, symlinked to wherever each application expects them. Edit the file in one place, and the symlink means the application always sees the latest version.

Manually creating symlinks for each tool is doable, but GNU stow manages them for you. Stow mirrors your repo’s directory structure into a target (usually `$HOME`). You organize by application `nvim`, `ghostty`, `git` and inside each folder you recreate the path where the config should live relative to `$HOME`. So if nvim expects its config at `$HOME/.config/nvim`, you put it at `$HOME/.dotfiles/nvim/.config/nvim`. Then `stow nvim` from inside `$HOME/.dotfiles` creates the symlink. Add your stow calls to an install script and a new machine is one command away.

### Wrap-Up
In general this has worked really well for me, it lets me use git to manage my dotfiles really easily, it’s not something I ever really have to think about after the initial setup, between a Brewfile and my stow script setting up a new machine is a breeze. When I wind up adding a new LSP keymapping for neovim it’s easy to sync between different machines.

You can find my personal config here: https://github.com/LiamCoop/config


[1] [https://news.ycombinator.com/item?id=11070797](https://news.ycombinator.com/item?id=11070797)

[2] [https://www.atlassian.com/git/tutorials/dotfiles](https://www.atlassian.com/git/tutorials/dotfiles)

[3] [https://www.youtube.com/watch?v=_nG09Z_tdUU](https://www.youtube.com/watch?v=_nG09Z_tdUU)
