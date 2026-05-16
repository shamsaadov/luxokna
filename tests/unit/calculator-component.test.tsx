import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Calculator } from '@/components/Calculator/Calculator'

beforeEach(() => {
  sessionStorage.clear()
})

describe('Calculator drawer', () => {
  it('opens, shows step 1, advances to step 2', async () => {
    const onClose = vi.fn()
    render(<Calculator open={true} onClose={onClose} />)
    expect(screen.getByText(/ПРОЁМ/)).toBeInTheDocument()
    const next = screen.getByRole('button', { name: /Далее/ })
    await userEvent.click(next)
    expect(screen.getByText(/МАТЕРИАЛ/)).toBeInTheDocument()
  })

  it('closes on ESC', async () => {
    const onClose = vi.fn()
    render(<Calculator open={true} onClose={onClose} />)
    await userEvent.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalled()
  })

  it('persists state to sessionStorage across mount', async () => {
    const { unmount } = render(
      <Calculator open={true} onClose={() => {}} />,
    )
    const w = screen.getByLabelText('Ширина, мм') as HTMLInputElement
    // Use fireEvent.change to set the full value atomically — userEvent.type
    // emits one keystroke at a time, and the reducer clamps width to [300, 6000]
    // after each keystroke, so intermediate '1' would clamp to 300.
    fireEvent.change(w, { target: { value: '1500' } })
    unmount()
    render(<Calculator open={true} onClose={() => {}} />)
    const w2 = screen.getByLabelText('Ширина, мм') as HTMLInputElement
    expect(w2.value).toBe('1500')
  })
})
