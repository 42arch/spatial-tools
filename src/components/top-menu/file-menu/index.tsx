import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger
} from '@/components/ui/menubar'
import ImportMenuItem from './import'

function FileMenu() {
  return (
    <MenubarMenu>
      <MenubarTrigger className='relative'>File</MenubarTrigger>
      <MenubarContent className='text-[13px]'>
        <ImportMenuItem />
        <MenubarItem>Import From URL</MenubarItem>
        <MenubarSeparator />
        <MenubarItem>
          Import... <MenubarShortcut>⌘O</MenubarShortcut>
        </MenubarItem>
        <MenubarItem>
          Show in Finder <MenubarShortcut>⇧⌘R</MenubarShortcut>{' '}
        </MenubarItem>
        <MenubarItem>Convert</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  )
}

export default FileMenu
