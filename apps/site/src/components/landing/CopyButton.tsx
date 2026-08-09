'use client'

import { useEffect, useRef, useState } from 'react'

import { CheckIcon, CopyIcon } from './Icons'

// Fallback for HTTP origins / older browsers where navigator.clipboard is unavailable.
function copyWithFallback(text: string): boolean {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    let succeeded = false
    try {
        succeeded = document.execCommand('copy')
    } catch {
        succeeded = false
    }
    document.body.removeChild(textarea)
    return succeeded
}

export default function CopyButton({ text }: { text: string }) {
    const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle')
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [])

    const handleCopy = async () => {
        let succeeded = false
        try {
            if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(text)
                succeeded = true
            } else {
                succeeded = copyWithFallback(text)
            }
        } catch {
            succeeded = copyWithFallback(text)
        }

        setStatus(succeeded ? 'copied' : 'error')
        timeoutRef.current = setTimeout(() => setStatus('idle'), 1600)
    }

    return (
        <button
            type="button"
            className="lw-copy-btn"
            onClick={handleCopy}
            aria-label={
                status === 'error' ? 'Copy failed' : 'Copy to clipboard'
            }
        >
            {status === 'copied' ? (
                <CheckIcon size={15} />
            ) : (
                <CopyIcon size={15} />
            )}
        </button>
    )
}
