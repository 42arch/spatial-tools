import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarSubTrigger,
  MenubarSeparator,
  MenubarSubContent,
  MenubarShortcut,
  MenubarMenu,
  MenubarSub,
  MenubarTrigger
} from './ui/menubar'

export function TopMenu() {
  return (
    <Menubar className='rounded-none border-b border-none px-2 lg:px-4'>
      <MenubarMenu>
        <MenubarTrigger className='font-bold'>SPT</MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className='relative'>File</MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>New</MenubarSubTrigger>
            <MenubarSubContent className='w-[230px]'>
              <MenubarItem>
                Playlist <MenubarShortcut>⌘N</MenubarShortcut>
              </MenubarItem>
              <MenubarItem disabled>
                Playlist from Selection <MenubarShortcut>⇧⌘N</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Smart Playlist... <MenubarShortcut>⌥⌘N</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>Playlist Folder</MenubarItem>
              <MenubarItem disabled>Genius Playlist</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSub>
            <MenubarSubTrigger>Import from</MenubarSubTrigger>
            <MenubarSubContent className='w-[230px]'>
              <MenubarItem>Geojson</MenubarItem>
              <MenubarItem>Shapfile</MenubarItem>
              <MenubarItem>Excel</MenubarItem>
              <MenubarItem>CSV</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className='relative'>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem disabled>
            Undo <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>
            Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
