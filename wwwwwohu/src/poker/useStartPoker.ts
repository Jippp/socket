// 扑克的主要逻辑
import { useEffect } from 'react'

/* @ts-ignore */
import Deck from './pokerDist.js'

export default () => {
  useEffect(() => {
    const $container = document.getElementById('container')
    if($container && $container.children.length) {
      $container.innerHTML = ''
    }
    if($container && !$container.children.length) {
      const $shuffle = document.getElementById('shuffle')
      const deck = Deck()
  
      $shuffle!.addEventListener('click', function () {
        deck.shuffle()
        deck.shuffle()
      })
  
      deck.mount($container)
  
      deck.intro()
      deck.sort()
    }
  }, [])

}