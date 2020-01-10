import React, { FC, InputHTMLAttributes } from 'react'
import { hot } from 'react-hot-loader/root'

interface OuterProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  text: string
}
interface Props extends OuterProps {}

const Toggler: FC<Props> = ({ id, text, checked, ...props }) => (
  <div>
    <input id={id} name={id} type="checkbox" checked={checked} value={String(checked)} {...props} />
    <label htmlFor={id}>{text}</label>
  </div>
)

export default hot(Toggler)
