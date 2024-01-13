import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import HeaderCardComponent from './HeaderCardComponent.vue'

describe('Given HeaderCardComponent', () => {
  describe('When its rendered', () => {
    it('Then it prints all the correct data', () => {
      render(HeaderCardComponent, {
        props: {
          headerCardInfo: {
            title: 'test-title',
            description: 'test-description',
            cta: 'test-cta',
            image: 'test-img',
          },
        },
      })
      expect(screen.getByText('test-title')).toBeDefined()
      expect(screen.getByText('test-description')).toBeDefined()
      expect(screen.getByText('test-cta')).toBeDefined()
    })
  })
})
