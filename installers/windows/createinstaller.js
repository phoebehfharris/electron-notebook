const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })

function getInstallerConfig () {
  console.log('creating windows installer')
  const rootPath = path.join('./')
  const outPath = path.join(rootPath, 'release-files')

  return Promise.resolve({
    appDirectory: path.join(rootPath, '/release-builds/hotdogs-notebook-win32-ia32/'),
    authors: 'Hotdog',
    noMsi: true,
    outputDirectory: path.join(outPath, 'windows-installer'),
    exe: 'hotdogs-notebook.exe',
    setupExe: 'notebookinstaller.exe',
    setupIcon: path.join(rootPath, 'assets', 'Logo.ico')
  })
}