import React from 'react'

interface Props {
  children: string;
  OnClick: () => void;
  color?: 'primary' | 'secondary' | 'danger';
}

const Button = ({ children, OnClick, color='primary' }: Props) => {

  return (
   
<button className ={'btn btn-' + color} onClick={OnClick}>{children}</button>

  )
}

export default Button