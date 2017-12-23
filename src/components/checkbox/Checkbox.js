import React from 'react'
import './style.css'

const Checkbox = ({label, checked, onChange, value, id}) => (
    <span>
        <input type="checkbox" id={id} onChange={(onChange)} checked={checked} value={value} />
        <label htmlFor={id}>
        <span></span> {label}
        </label>
    </span>
)

export default  Checkbox;