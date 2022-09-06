import React from 'react';
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router';
interface Props extends React.PropsWithChildren<LinkProps> {
    style?: CSSStyleSheet;
    className?: string;
    onClick?: any;
    exact?: boolean;
    // href: string;
}
export default function NavLink(props: Props) {
    const { exact = false, href, children, className = '' } = props
    const { pathname } = useRouter();
    const isActive = exact ? pathname === href : pathname.startsWith(href.toString());
    let initClass='';
    if (isActive) {
        initClass = className + ' active';
    }else{
        initClass = className;
    }

    return (
        <Link href={href} >
            <a className={initClass} >{children}</a>
        </Link>
    );
}