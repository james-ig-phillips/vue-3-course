const links = [
    { id: 1, name: 'home', url: '/home' },
    { id: 2, name: 'portfolio', url: '/portfolio' },
    { id: 3, name: 'contact me', url: '/contact-me' },
]

const appHeader = {
    data() {
        return {
            name: "James Phillips",
            links,
        }
    },
    template: `<header>
    <h1>{{ name }}' Portfolio</h1>
    <nav>
      <ul>
        <li v-for="link in links" :key="link.id">
          <a :href="link.url">{{link.name}}</a>
        </li>
      </ul>
    </nav>
  </header>`
};

const blogPost = {
    props: ["post"],
    template: `<article>
    <h3>{{post.title}}</h3>
    <p v-html="post.body"></p>
    <p class="read_more">Read More</p>
  </article>`
};

const app = Vue.createApp({
    components: {
        "blog-post": blogPost,
        "app-header": appHeader,
    },
    created() {
        this.getPosts();
    },
    data() {
        return {
            posts: [],
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
        async getPosts() {
            let response = await fetch('https://jsonplaceholder.typicode.com/posts');
            let data = await response.json();
            this.posts = data;
        },
    }
});

// app.component('app-header', {
//     data() {
//         return {
//             name: "James Phillips",
//             links,
//         }
//     },
//     template: `<header>
//     <h1>{{ name }}' Portfolio</h1>
//     <nav>
//       <ul>
//         <li v-for="link in links" :key="link.id">
//           <a :href="link.url">{{link.name}}</a>
//         </li>
//       </ul>
//     </nav>
//   </header>`,
// });

// app.component('blog-post', {
//     props: ["post"],
//     template: `<article>
//     <h3>{{post.title}}</h3>
//     <p v-html="post.body"></p>
//     <p class="read_more">Read More</p>
//   </article>`
// });

app.mount('body');