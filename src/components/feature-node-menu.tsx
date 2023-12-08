'use client'

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger
} from '@/components/ui/context-menu'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export function FeatureNodeMenu({ children }: Props) {
  return (
    <ContextMenu>
      <ContextMenuTrigger className=''>{children}</ContextMenuTrigger>
      <ContextMenuContent className='w-32'>
        <ContextMenuItem inset>Delete</ContextMenuItem>
        <ContextMenuItem inset>Simplify</ContextMenuItem>
        <ContextMenuItem inset>Copy</ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
          <ContextMenuSubContent className='w-32'>
            <ContextMenuItem>Save Page As...</ContextMenuItem>
            <ContextMenuItem>Create Shortcut...</ContextMenuItem>
            <ContextMenuItem>Name Window...</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Developer Tools</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  )
}
