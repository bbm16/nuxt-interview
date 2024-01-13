import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import FooterComponent from './FooterComponent.vue'

describe('Given FooterComponent', () => {
  describe('When its rendered', () => {
    it('Then it prints all the correct Links', () => {
      render(FooterComponent)
      expect(screen.getByText('How it works')).toBeDefined()
      // ... or even looping and checking real links once defined
    })
  })
})
