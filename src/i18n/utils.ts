export function getPageLangFromSlug(slug: string) {
    const lang = slug.split("/")[0];
    return lang;
}

export function deconstructSlug(slug: string) {
    const [lang, ...rest] = slug.split("/");
    return { lang, slugWithoutLang: rest.join("/") };
}