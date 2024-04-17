export default {
	i18nDef: import.meta.env.VITE_LOCAL,
	i18nEnum: {
		ZHCN: {
			name: "简体中文",
			value: "zh-CN",
		},
		ZHTW: {
			name: "繁体中文",
			value: "zh-TW"
		},
		ENUS: {
			name: "English",
			value: "en-US",
		},
	},
	i18nEnumKey: {
		"zh-CN": "简体中文",
		"zh-TW": "繁体中文",
		"en-US": "English",
	},
	i18nKey: /\/zh-CN|en-US|zh-TW\//,
	i18nKeyArr: ["zh-CN", "en-US", "zh-TW"],
	i18nKeys: [
		{
			label: "简体中文",
			value: "zh-CN",
			key: "zh-CN",
		},
		{
			label: "繁体中文",
			value: "zh-TW",
			key: "zh-TW",
		},
		{
			label: "English",
			value: "en-US",
			key: "en-US",
		},
	],
	sizeKeys: [
		{
			label: "默认",
			value: "default",
		},
		{
			label: "大型",
			value: "large",
		},
		{
			label: "小型",
			value: "small",
		},
	],
};
