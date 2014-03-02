({

	baseUrl: "static/src/", 

	out: "static/js/site.min.js", 

	name: "main", 

	optimize: "uglify2",

	skipModuleInsertion: true,

	include: [		
		"framework/Simplrz",
		"framework/Events",
		"framework/Application",

		"framework/domExtend/DomExtend",
		"framework/domExtend/State",
		"framework/domExtend/Transform",
		"framework/domExtend/Transition",

		"framework/FrameImpulse",
		"framework/HistoryRouter",
		"framework/Loader",
		"framework/MSG",
		"framework/VirtualScroll",
		"framework/Pointer",
		"framework/Util"
	]
})