## How well do you know night city?

Guessrpunk is an attempt to emulate 'Guessr' style gameplay within the world of Cyberpunk 2077. Try to achieve the highest score possible over the course of 5 rounds!

This is a quick project I've slapped together over a few days. Images are stitched together from screenshots taken in-game using Microsoft ICE and may have artifacts or distortion in some places depending on the quality of the stitch. Written in React / NextJS

## Adding locations

Adding locations is a small bit of a process. Nvidia Ansel doesn't support Cyberpunk and so the panoramas are constructed from individual images (usually 25/30 per location) which have been stiched together. Any stitching software should work, so long as the images are appropriately sized/formatted. 

The best process I've personally found is to install a camera mod which allows you to spin in a circle using arrow keys, taking screenshots roughly every 20 degrees rotated, doing three rotations while looking up, straight, and down. Then throw these images into a stitching software, and assuming all goes well, exporting as a sphere/360 panorama. You can then place these images in the /public/panoramas directory and give them an appropriate ID.

The next step is to add them to the array, found in /components/imageArray.js. Add a new object with the same id and URL as your image, and then find the location of your image on the map. This can be done by finding the pixel location on the /public/satellite.webp map. For example, if your location is at 784px x 1558px on the map (measured from the top left) then you can add those values as "[(mapHeight - 0.1558), 0.0784]" in the object. If your're measuring from the bottom left of the image then there's no need to subtract by mapheight, it's just a quirk of my process. You're then done and ready for testing, simply comment out all objects that are not your location and test to see if the answer marker is placed where you want it (you will get an error going to the next round if the other objects are commented out).

Best of luck, and don't hesitate to get in touch!
