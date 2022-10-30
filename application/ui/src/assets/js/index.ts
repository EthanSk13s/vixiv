class IndexPost {
    id: number;
    title: string;
    url: string;

    constructor(id: number, title: string, url: string) {
        this.title = title;
        this.url = url;
        this.id = id;
    }

    createHtmlPost() {
        let parentContainer = document.createElement("div");
        parentContainer.setAttribute("class", "row-md post-flex");
        parentContainer.setAttribute("id", String(this.id));

        let childContainer = document.createElement("div");
        childContainer.setAttribute("class", "post-container row-md");

        let titleContainer = document.createElement("div");
        titleContainer.setAttribute("class", "column-md title");
        titleContainer.innerHTML = this.title;

        let imageContainer = document.createElement("div");
        imageContainer.setAttribute("class", "column-md");

        let imageWrapper = document.createElement("section");
        imageWrapper.setAttribute("class", "thumbnail-container");

        let image = document.createElement("img");
        image.setAttribute("src", this.url);
        image.setAttribute("class", "thumbnail-container");

        // for now, use id
        let userContainer = document.createElement("div");
        userContainer.setAttribute("class", "column-md title");
        userContainer.innerHTML = this.title;

        // Construct html
        imageWrapper.appendChild(image);
        imageContainer.appendChild(imageWrapper);

        childContainer.appendChild(titleContainer);
        childContainer.appendChild(imageContainer);
        childContainer.appendChild(userContainer);

        parentContainer.appendChild(childContainer);
        parentContainer.style.opacity = "1";

        return parentContainer;
    }

    removeSelf(numOfPosts: number) {
        let self = document.getElementById(String(this.id));
        let calls = 0;
        let id = setInterval(() => {
            if (calls != 20) {
                fadeOut(this.id);
                calls++;
            } else {
                clearInterval(id);
                self?.parentElement?.removeChild(self);
            }
        }, 5, this.id);

        numOfPosts--;
        console.log(numOfPosts);
        return numOfPosts;
    }
}

function fadeOut(id: number) {
    const self = document.getElementById(String(id));
    if (Number(self?.style.opacity) >= 0) {
        let newOpacity = Number(self?.style.opacity) - 0.05;
        self!.style.opacity = String(newOpacity);
    }
}

function createCounter(parent: HTMLElement, count: number) {
    if (document.getElementById("counter") == null) {
        let counter = document.createElement("div");
        counter.setAttribute("id", "counter");
        counter.setAttribute("class", "flex-container column");
        counter.innerHTML = `The number of posts in index is: ${count}`;
    
        parent.appendChild(counter);
    }
}

function setCounter(counter: HTMLElement, newCount: number) {
    counter.innerHTML = `The number of posts in index is: ${newCount}`;
}

const testPosts = "https://jsonplaceholder.typicode.com/albums/2/photos"
const MAX_POSTS = 15;

export function fetchPosts() {
    fetch(testPosts)
        .then((response) => response.json())
        .then((data) => {
            let numOfPosts = 0;
            let container = document.getElementsByClassName("flex-container row");
            let fragment = document.createDocumentFragment();

            for (let i = 0; i < MAX_POSTS; i++) {
                let post = new IndexPost(data[i]["id"], data[i]["title"], data[i]["url"]);
                let htmlPost = post.createHtmlPost();
                htmlPost.addEventListener("click", () => {
                    numOfPosts = post.removeSelf(numOfPosts);
                    setCounter(document.getElementById("counter")!, numOfPosts);
                });

                fragment.appendChild(htmlPost);
                numOfPosts++;
            }

            container[0].appendChild(fragment);

            let footer = document.getElementsByTagName("footer");
            createCounter(footer[0], numOfPosts);
        });
}