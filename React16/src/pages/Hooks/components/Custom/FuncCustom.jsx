import React, { useEffect, useCallback, useState } from 'react'

function useWinSize() {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  })
  const onResize = useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    })
  }, [])
  useEffect(() => {
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
    // eslint-disable-next-line
  }, [])
  return size
}

export default function FuncCustom() {
  const winSize = useWinSize()
  return (
    <div>
      页面宽高为：{winSize.width}x{winSize.height}
    </div>
  )
}
