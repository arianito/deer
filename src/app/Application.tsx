import {Http} from "xhttplayer";
import {IApplication, IStore} from "ssrstore";
import {__, LocaleManager} from "intlocalize";
import {AxiosHttpDriver} from "./AxiosHttpDriver";
import * as React from "react";
import {MESSAGES_FA} from "../locales/fa";
import {LANG_EN} from "intlocalize/dist/defaults/en";
import {LANG_FA} from "intlocalize/dist/defaults/fa";

export class Application extends React.Component implements IApplication {
	async configure(props: IStore) {
		LocaleManager.LoadLocale('en', LANG_EN);
		LocaleManager.LoadLocale('fa', LANG_FA);
		LocaleManager.LoadMessages(MESSAGES_FA);
		LocaleManager.Initalize('fa');

		Http.Configure(Http.CreateMockDriver(AxiosHttpDriver), (config) => ({
			...config,
			log: false,
			baseURL: '/api',
			timeout: 30000,
		}));
	}

	async clientStartup(props: IStore) {
		window.document.documentElement.setAttribute('dir', LocaleManager.IsRtl ? 'rtl' : 'ltr');
	}

	render(): React.ReactNode {
		return <div>
			im desktop
		</div>
	}
}
