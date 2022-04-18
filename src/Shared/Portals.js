export const places = [
    { color: "green", coord: [0, 0, 100], url: "/pic1.jpeg", link: 1 },
    { color: "white", coord: [0, 50, 100], url: "/docks.jpg", link: 0 }
];

export const mapPlaces = [
    { coord: [], title: "name", }
]

export const hotspots = [
    {
        id: 0,
        title: "name",
        description: "descrption of hotspot 1",
        mapTexture: "/pic1.jpeg",
        mapCoord: [37, 37],
        panoCoord:
            [
                {
                    coord: [0, 0, 100],
                    link: 1
                }
            ]
    },
    {
        id: 1,
        title: "name2",
        description: "descrption of hotspot 2",
        mapTexture: "/docks.jpg",
        mapCoord: [60, 60],
        panoCoord:
            [
                {
                    coord: [0, 50, 100],
                    link: 0
                }
            ]
    }
]