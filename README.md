## How well do you know night city?

Guessrpunk is an attempt to emulate 'Guessr' style gameplay within the world of Cyberpunk 2077. Try to achieve the highest score possible over the course of 5 rounds!

This is a quick project I've slapped together over a few days. Images are stitched together from screenshots taken in-game using Microsoft ICE and may have artifacts or distortion in some places depending on the quality of the stitch. Written in React / NextJS

## Adding locations

Adding locations is a small bit of a process. Nvidia Ansel doesn't support Cyberpunk and so the panoramas are constructed from individual images (usually 25/30 per location) which have been stiched together. Any stitching software should work, so long as the images are appropriately sized/formatted. 

The best process I've personally found is to install a camera mod which allows you to spin in a circle using arrow keys, taking screenshots roughly every 20 degrees rotated, doing three rotations while looking up, straight, and down. Then throw these images into a stitching software, and assuming all goes well, exporting as a sphere/360 panorama.