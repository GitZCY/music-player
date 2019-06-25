import routerComponent from './routerComponent.js';

export default [
    {
        path: '/loading',
        name: "Loading",
        component: routerComponent.Loading
    },

    {
        path: '/',
        name: "Home",
		redirect: {name: 'Find'},
        component: routerComponent.Home,
		children: [
			{
				path: "/my",
				name: "My",
				component: routerComponent.My
			},
			{
				path: "/find",
				name: "Find",
				component: routerComponent.Find
			},
			{
				path: "/songs",
				name: "Songs",
				component: routerComponent.Songs
			}
		]
    },

    {
        path: '/music',
        name: "Music",
        component: routerComponent.Music
    },

    {
        path: '/list',
        name: "List",
        component: routerComponent.List
    },
	
	{
	    path: '/official',
	    name: "official",
	    component: routerComponent.Official
	},
	
	{
	    path: '/seach',
	    name: "Seach",
	    component: routerComponent.Seach
	},
	
    {
        path: '/test',
        name: "Test",
        component: routerComponent.Test
    },
]