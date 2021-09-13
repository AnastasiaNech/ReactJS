import s from './style.module.css';

const Layout = ({title, urlBg = false, colorBg = false, children}) => {
    const styleRoot = {
        background: colorBg ? colorBg : urlBg ? `url(${urlBg})` : 'none'
    }
    return (
        <section className={s.root} style={styleRoot}>
            <div className={s.wrapper}>
                <article>
                    <div className={s.title}>
                        <h3>{title}</h3>
                        <span className={s.separator}></span>
                    </div>
                    <div className={`${s.desc} ${s.full}`}>
                        {children}
                    </div>
                </article>
            </div>
        </section>
    )
}

export default Layout;
