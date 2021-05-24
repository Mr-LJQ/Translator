
./src
  ./watcher (监听用户操作的模块)
    ./KeyBoardWatcher.ts  //实现按住热键自动选取功能
    ./SelectionWatcher.ts //监听用户拖蓝操作
    ./PopupSearchBar.ts //弹出searchBar
  ./shower
  ./foreground (内容脚本模块，是shower、watcher模块的协调中枢)
    ./index.ts (处理与后台脚本的通信、与shower<iframe>的通信、管理watcher)
  ./
    