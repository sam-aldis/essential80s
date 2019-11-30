import { markupHome } from "~pages/home";
type Page = "home" | "theshow" | "repertoire" | "media" | "gallery" | "bookings";
interface IRouter {
	currentPage : Page;
	nextPage : Page;
	Navigate(page : Page) : void;
}
interface IRouterLink {
	name: string;
	template: HTMLElement | string;
}
const links : IRouterLink[] = [
	{
		name: "home",
		template: markupHome.getHTML()
	},
	{
		name : "theshow",
		template: ""
	}
];
class Router implements IRouter {
	public currentPage : Page = (document.location.hash !== undefined) ? ((document.location.hash.replace("#", "") as Page) ? document.location.hash.replace("#", "") as Page : "home") : "home";
	public nextPage : Page = "home";
	constructor(private container : HTMLElement) {

	}
	get page() {
		this.nextPage = (document.location.hash !== undefined) ? ((document.location.hash.replace("#", "") as Page) ? document.location.hash.replace("#", "") as Page : "home") : "home";
		this.Navigate(this.nextPage);
		return this.nextPage;
	}
	Navigate(page : Page) : void {
		
		let newLink = (document.querySelector(`#NAV${page}`) as HTMLElement);
		let oldLink = (document.querySelector(`#NAV${this.currentPage}`) as HTMLElement);
		console.log(oldLink);
		this.currentPage = page;
		oldLink.classList.remove("current--page");
		newLink.classList.add("current--page");
	}
}

const router = new Router((document.querySelector("#content") as HTMLElement));
const routerLink = (page : Page)=> {
	router.Navigate(page);
}
window.onhashchange = ()=> {
	console.log(router.page);
}
document.onload = () => {
	
}