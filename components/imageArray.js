const imageLocation = "/panoramas"

/* 
Leaflet, the library used to create the bottom right map, measures from the bottom left of the image,
whereas the software I used to find the coordinates of the location on the map measures from the top left,
hence the need to subtract mapHeight here.
*/

const mapHeight = 0.2891
const imageArray = [
    {
        "id" : 0,
        "url" : `${imageLocation}/0.jpg`,
        "location" : [0.1191, 0.0623],
        "difficulty" : "easy"
    },
    // Location 1 is too hard and too poor quality to use IMO
    // {
    //     "id" : 1,
    //     "url" : "/1.jpg",
    //     "location" : [(mapHeight - 0.1781), 0.0892],
    //     "difficulty" : "easy"
    // },
    {
        "id" : 2,
        "url" : `${imageLocation}/2.jpg`,
        "location" : [(mapHeight - 0.2206), 0.1255],
        "difficulty" : "easy"
    },
    {
        "id" : 3,
        "url" : `${imageLocation}/3.jpg`,
        "location" : [(mapHeight - 0.1474), 0.1019],
        "difficulty" : "easy"
    },

    {
        "id" : 4,
        "url" : `${imageLocation}/4.jpg`,
        "location" : [(mapHeight - 0.0889), 0.0902],
        "difficulty" : "easy"
    },
    {
        "id" : 5,
        "url" : `${imageLocation}/5.jpg`,
        "location" : [(mapHeight - 0.1238), 0.1238],
        "difficulty" : "easy"
    },
    {
        "id" : 6,
        "url" : `${imageLocation}/6.jpg`,
        "location" : [(mapHeight - 0.1266), 0.1177],
        "difficulty" : "easy"
    },
    {
        "id" : 7,
        "url" : `${imageLocation}/7.jpg`,
        "location" : [(mapHeight - 0.2383), 0.0526],
        "difficulty" : "easy"
    },
    {
        "id" : 8,
        "url" : `${imageLocation}/8.jpg`,
        "location" : [(mapHeight - 0.2054), 0.1052],
        "difficulty" : "easy"
    },
    {
        "id" : 9,
        "url" : `${imageLocation}/9.jpg`,
        "location" : [(mapHeight - 0.1659), 0.1309],
        "difficulty" : "easy"
    },
    {
        "id" : 10,
        "url" : `${imageLocation}/10.jpg`,
        "location" : [(mapHeight - 0.1427), 0.1217],
        "difficulty" : "easy"
    },
    {
        "id" : 11,
        "url" : `${imageLocation}/11.jpg`,
        "location" : [(mapHeight - 0.1480), 0.1135],
        "difficulty" : "easy"
    },
    {
        "id" : 12,
        "url" : `${imageLocation}/12.jpg`,
        "location" : [(mapHeight - 0.1629), 0.0688],
        "difficulty" : "easy"
    },
    {
        "id" : 13,
        "url" : `${imageLocation}/13.jpg`,
        "location" : [(mapHeight - 0.2001), 0.0450],
        "difficulty" : "easy"
    },
    {
        "id" : 14,
        "url" : `${imageLocation}/14.jpg`,
        "location" : [(mapHeight - 0.1093), 0.1473],
        "difficulty" : "easy"
    },
    {
        "id" : 15,
        "url" : `${imageLocation}/15.jpg`,
        "location" : [(mapHeight - 0.2180), 0.1865],
        "difficulty" : "easy"
    },
    {
        "id" : 16,
        "url" : `${imageLocation}/16.jpg`,
        "location" : [(mapHeight - 0.0873), 0.0451],
        "difficulty" : "easy"
    },
    {
        "id" : 17,
        "url" : `${imageLocation}/17.jpg`,
        "location" : [(mapHeight - 0.1558), 0.0784],
        "difficulty" : "easy"
    },
    {
        "id" : 18,
        "url" : `${imageLocation}/18.jpg`,
        "location" : [(mapHeight - 0.2171), 0.1546],
        "difficulty" : "easy"
    },
    {
        "id" : 19,
        "url" : `${imageLocation}/19.jpg`,
        "location" : [(mapHeight - 0.2606), 0.1859],
        "difficulty" : "easy"
    },
    {
        "id" : 20,
        "url" : `${imageLocation}/20.jpg`,
        "location" : [(mapHeight - 0.2042), 0.0358],
        "difficulty" : "easy"
    },
    {
        "id" : 21,
        "url" : `${imageLocation}/21.jpg`,
        "location" : [(mapHeight - 0.1394), 0.0420],
        "difficulty" : "easy"
    },
    {
        "id" : 22,
        "url" : `${imageLocation}/22.jpg`,
        "location" : [(mapHeight - 0.0820), 0.1241],
        "difficulty" : "easy"
    },
    {
        "id" : 23,
        "url" : `${imageLocation}/23.jpg`,
        "location" : [(mapHeight - 0.0906), 0.1338],
        "difficulty" : "easy"
    },
    {
        "id" : 24,
        "url" : `${imageLocation}/24.jpg`,
        "location" : [(mapHeight - 0.2063), 0.1338],
        "difficulty" : "easy"
    },
    {
        "id" : 25,
        "url" : `${imageLocation}/25.jpg`,
        "location" : [(mapHeight - 0.2230), 0.1360],
        "difficulty" : "easy"
    },
    {
        "id" : 26,
        "url" : `${imageLocation}/26.jpg`,
        "location" : [(mapHeight - 0.1193), 0.1070],
        "difficulty" : "easy"
    },
    {
        "id" : 27,
        "url" : `${imageLocation}/27.jpg`,
        "location" : [(mapHeight - 0.1304), 0.1410],
        "difficulty" : "easy"
    },
    {
        "id" : 28,
        "url" : `${imageLocation}/28.jpg`,
        "location" : [(mapHeight - 0.2265), 0.0590],
        "difficulty" : "easy"
    },
    {
        "id" : 29,
        "url" : `${imageLocation}/29.jpg`,
        "location" : [(mapHeight - 0.2147), 0.1358],
        "difficulty" : "easy"
    },
    {
        "id" : 30,
        "url" : `${imageLocation}/30.jpg`,
        "location" : [(mapHeight - 0.0747), 0.0872],
        "difficulty" : "easy"
    },
    {
        // Stitch on this one is a bit rough, might re-do
        "id" : 31,
        "url" : `${imageLocation}/31.jpg`,
        "location" : [(mapHeight - 0.0913), 0.0838],
        "difficulty" : "easy"
    },
    {
        "id" : 32,
        "url" : `${imageLocation}/32.jpg`,
        "location" : [(mapHeight - 0.0594), 0.1416],
        "difficulty" : "easy"
    },
    {
        "id" : 33,
        "url" : `${imageLocation}/33.jpg`,
        "location" : [(mapHeight - 0.1131), 0.0763],
        "difficulty" : "easy"
    },
    {
        "id" : 34,
        "url" : `${imageLocation}/34.jpg`,
        "location" : [(mapHeight - 0.1140), 0.0584],
        "difficulty" : "easy"
    },
    
    
]

export default imageArray