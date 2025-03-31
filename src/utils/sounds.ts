// Sound utility functions

// Play a sound effect
export const playSound = (soundName: string): void => {
  try {
    const audio = new Audio(`/sounds/${soundName}.mp3`);
    audio.volume = 0.5; // Set volume to 50%
    audio.play().catch(error => {
      console.error('Error playing sound:', error);
    });
  } catch (error) {
    console.error('Error creating audio:', error);
  }
};

// Sound names
export const SOUNDS = {
  MATCH: 'match',
  FLIP: 'flip',
  WIN: 'win',
};
