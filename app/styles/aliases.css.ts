import { globalStyle } from '@vanilla-extract/css'
import { vars } from './tokens.css'

globalStyle(':root', {
  vars: {
    '--copper': vars.color.copper,
    '--char': vars.color.char,
    '--bone': vars.color.bone,
    '--boneDeep': vars.color.boneDeep,
    '--paper': vars.color.paper,
    '--sand': vars.color.sand,
    '--charSoft': vars.color.charSoft,
    '--rule': vars.color.rule,
    '--font-display': vars.font.display,
    '--font-body': vars.font.body,
    '--font-mono': vars.font.mono,
  },
})
