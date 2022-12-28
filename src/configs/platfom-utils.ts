import { Dimensions } from 'react-native';

export enum SCREEN_SIZE {
	/**
	 * Screen Width <576px
	 */
	X_SMALL = 'extra_small',

	/**
	 * Screen Width >=576px
	 */
	SMALL = 'small',

	/**
	 * Screen Width >=768px
	 */
	MEDIUM = 'medium',

	/**
	 * Screen Width >=992px
	 */
	LARGE = 'large',

	/**
	 * Screen Width >=1200px
	 */
	X_LARGE = 'extra_large',
}

export const getScreenType = (
	screenWidth?: number,
): SCREEN_SIZE => {
	const screenWidthX =
		screenWidth || Dimensions.get('window').width;
	if (screenWidthX < 576)
		return SCREEN_SIZE.X_SMALL;
	if (screenWidthX < 768) return SCREEN_SIZE.SMALL;
	if (screenWidthX < 992)
		return SCREEN_SIZE.MEDIUM;
	if (screenWidthX < 1200)
		return SCREEN_SIZE.LARGE;
	if (screenWidthX >= 1200)
		return SCREEN_SIZE.X_LARGE;

	return SCREEN_SIZE.X_SMALL;
};
export const isMobile = (
	screenType: SCREEN_SIZE,
) =>
	screenType === SCREEN_SIZE.X_SMALL ||
	screenType === SCREEN_SIZE.SMALL;
const PLATFORM_PADDING: number = 16 * 2;
const DESKTOP_WIDTH: number = 508;

export const UI_WINDOW_HEIGHT: (
	screenType: SCREEN_SIZE,
) => number = (screenType: SCREEN_SIZE) =>
	isMobile(screenType)
		? PLATFORM_PADDING
		: 114 + PLATFORM_PADDING;

export const _getUiWindow: (
	screenSize: number,
) => number = (screenSize) =>
	isMobile(getScreenType(screenSize))
		? screenSize - PLATFORM_PADDING
		: DESKTOP_WIDTH - PLATFORM_PADDING;
