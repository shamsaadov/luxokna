import { buildWhatsAppMessage, type CalcInput } from '@/lib/whatsapp'
import * as s from './steps/steps.css'

interface Props {
  input: CalcInput
}

export function MessagePreview({ input }: Props) {
  return (
    <pre className={s.meta} style={{ whiteSpace: 'pre-wrap' }}>
      {buildWhatsAppMessage(input)}
    </pre>
  )
}
