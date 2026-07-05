import React, { useState } from 'react'

const Help = () => {
    const[name, setName] = useState("");
    const handle = (e)=>{
        setName(e.target.value);
    }
    return (
        <div className="page">
            <div className="container-narrow">
                <p className="section-eyebrow">Support</p>
                <h1 className="section-title" style={{ marginBottom: '8px' }}>Help Center</h1>
                <p className="section-sub" style={{ marginBottom: '32px' }}>Type your name below to get started.</p>

                <div className="card">
                    <label className="label">Your Name</label>
                    <input className="input" type="text" value={name} onChange={handle} placeholder="Enter your name..." />
                    {name && (
                        <p className="text-cyan" style={{ marginTop: '16px', fontWeight: 600, fontSize: '18px' }}>
                            Hello, {name} 👋
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Help
