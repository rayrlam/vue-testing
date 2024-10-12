import { debounce } from '../utilities';
import { describe, beforeEach, vi, afterEach, it, expect } from 'vitest';

describe('Utilities', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });
    
    describe('Debounce', () => {
        it('can call a function after a given time', () => {
            const fake = vi.fn(() => {});
            debounce(fake, 300);
            expect(fake).not.toHaveBeenCalled();
            vi.advanceTimersByTime(300);
            expect(fake).toHaveBeenCalled();
        });

        it('only makes 1 call before timeout finishes', () => {
            const fake = vi.fn(() => {});
            debounce(fake, 300);
      
            vi.advanceTimersByTime(299);
            debounce(fake, 300);
 
            vi.advanceTimersByTime(299);
            debounce(fake, 300);
 
            vi.advanceTimersByTime(300);
            expect(fake).toHaveBeenCalledOnce();
        });
    });
});