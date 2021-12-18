const links = [
    { id: 1, name: 'home', url: '/home' },
    { id: 2, name: 'portfolio', url: '/portfolio' },
    { id: 3, name: 'contact me', url: '/contact-me' },
]

Vue.createApp({
    created() {
        this.getCircuits();
    },
    data() {
        return {
            name: "James Phillips",
            links,
            circuits: [],
            darkModeSet: true,
            darkMode: {
                background: '#38383a',
                color: 'whitesmoke',
            },
            base: {
                fontFamily: 'monospace',
            }
        }
    },
    methods: {
        toggleMode() {
            this.darkModeSet = !this.darkModeSet;
        },
        async getCircuits() {
            let response = await fetch('http://ergast.com/api/f1/circuits.json');
            let data = await response.json();
            let circuits = data.MRData.CircuitTable.Circuits;
            this.circuits = circuits;
        },
    }
}).mount('body');