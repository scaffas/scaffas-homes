# Snapshot file
# Unset all aliases to avoid conflicts with functions
unalias -a 2>/dev/null || true
shopt -s expand_aliases
# Check for rg availability
if ! (unalias rg 2>/dev/null; command -v rg) >/dev/null 2>&1; then
  function rg {
  local _cc_bin="${CLAUDE_CODE_EXECPATH:-}"
  [[ -x $_cc_bin ]] || _cc_bin=/c/Users/MyPC/.local/bin/claude.exe
  if [[ ! -x $_cc_bin ]]; then command rg ${1+"$@"}; return; fi
  if [[ -n ${ZSH_VERSION:-} ]]; then
    ARGV0=rg "$_cc_bin" ${1+"$@"}
  elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]] || [[ "$OSTYPE" == "win32" ]]; then
    ARGV0=rg "$_cc_bin" ${1+"$@"}
  else
    (exec -a rg "$_cc_bin" ${1+"$@"})
  fi
}
fi
export PATH='/c/Users/MyPC/bin:/mingw64/bin:/usr/local/bin:/usr/bin:/bin:/mingw64/bin:/usr/bin:/c/Users/MyPC/bin:/c/WINDOWS/system32:/c/WINDOWS:/c/WINDOWS/System32/Wbem:/c/WINDOWS/System32/WindowsPowerShell/v1.0:/c/WINDOWS/System32/OpenSSH:/c/Program Files/dotnet:/cmd:/c/Program Files/nodejs:/c/Users/MyPC/AppData/Local/Microsoft/WindowsApps:/c/Users/MyPC/AppData/Local/Python/bin:/c/Users/MyPC/AppData/Roaming/npm:/c/Program Files/nodejs:/mingw64/bin:/usr/bin/vendor_perl:/usr/bin/core_perl:/c/Users/MyPC/AppData/Roaming/Claude/local-agent-mode-sessions/d5b4d0cd-fb6d-4b05-8b95-9cabe4706e00/a01fa2ed-b592-4e18-aa89-dcc35c056468/rpm/plugin_0155zZVATbJU3jHUmPP9NvMC/bin:/c/Users/MyPC/AppData/Roaming/Claude/local-agent-mode-sessions/skills-plugin/a01fa2ed-b592-4e18-aa89-dcc35c056468/d5b4d0cd-fb6d-4b05-8b95-9cabe4706e00/bin'
