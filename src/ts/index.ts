type Page = "home" | "theshow" | "repertoire" | "media" | "gallery" | "bookings";
interface IRouter {
	currentPage : Page;
	nextPage : Page;
	Navigate(page : Page) : void;
}
interface IRouterLink {
	name: string;
	linkElement: HTMLElement;
}
class Router implements IRouter {
	public currentPage : Page = (document.location.hash !== undefined) ? ((document.location.hash.replace("#", "") as Page) ? document.location.hash.replace("#", "") as Page : "home") : "home";
	public nextPage : Page = "home";
	get page() {
		this.nextPage = (document.location.hash !== undefined) ? ((document.location.hash.replace("#", "") as Page) ? document.location.hash.replace("#", "") as Page : "home") : "home";
		this.Navigate(this.nextPage);
		return this.nextPage;
	}
	Navigate(page : Page) : void {
		let newElement = (document.querySelector(`#${page}`) as HTMLElement);
		let oldElement = (document.querySelector(`#${this.currentPage}`) as HTMLElement);
		let newLink = (document.querySelector(`#NAV${page}`) as HTMLElement);
		let oldLink = (document.querySelector(`#NAV${this.currentPage}`) as HTMLElement);
		console.log(oldLink);
		this.currentPage = page;
		oldElement.classList.add("article--hidden");
		newElement.classList.remove('article--hidden');
		oldLink.classList.remove("current--page");
		newLink.classList.add("current--page");
	}
}

const router = new Router();
const routerLink = (page : Page)=> {
	router.Navigate(page);
}
window.onhashchange = ()=> {
	console.log(router.page);
}
document.onload = () => {
	const links : IRouterLink[] = [
		{
			name: "home",
			linkElement: (document.querySelector("#NAVhome") as HTMLElement)
		},
		{
			name : "theshow",
			linkElement: (document.querySelector("#NAVtheshow") as HTMLElement)
		}
	]
	
	// links.forEach((el) => el.linkElement.addEventListener("click", ()=>routerLink(el.name as Page)));
}