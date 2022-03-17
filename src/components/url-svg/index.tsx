function UrlSVG({
	url,
	style,
}: {
	url: string;
	style?: React.CSSProperties;
}): JSX.Element {
	return (
		<svg style={style}>
			<image style={{ width: '100%' }} xlinkHref={url} />
		</svg>
	);
}

export default UrlSVG;
