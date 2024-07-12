import type { BoxProps } from '@mui/material/Box'

import { memo } from 'react'

import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'

// ----------------------------------------------------------------------

function NewPasswordIcon({ sx, ...other }: BoxProps) {
  const theme = useTheme()

  const PRIMARY_MAIN = theme.vars.palette.primary.main

  const WARNING_LIGHT = theme.vars.palette.warning.light

  const WARNING_DARK = theme.vars.palette.warning.dark

  return (
    <Box
      component="svg"
      width="100%"
      height="100%"
      fill="none"
      viewBox="0 0 96 96"
      xmlns="http://www.w3.org/2000/svg"
      sx={{ width: 96, flexShrink: 0, height: 'auto', ...sx }}
      {...other}
    >
      <rect x="24" y="55" width="48" height="17" fill={WARNING_LIGHT} />
      <path
        d="M36.3238 29.3905V37.1505C36.3238 39.8031 34.1734 41.9535 31.5208 41.9535V41.9535C28.8682 41.9535 26.7178 39.8031 26.7178 37.1505V29.3905C26.7178 17.7136 36.1226 8.19195 47.7552 8.00268L48.1085 8C59.7856 8 69.3069 17.4049 69.4962 29.0373L69.499 29.3905V37.1505C69.499 39.8031 67.3487 41.9535 64.6961 41.9535V41.9535C62.0434 41.9535 59.8931 39.8031 59.8931 37.1505V29.3905C59.8931 22.9575 54.7117 17.7118 48.3031 17.6075L48.1085 17.6059C41.6103 17.6059 36.3238 22.8925 36.3238 29.3905Z"
        fill={WARNING_LIGHT}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M59.3399 88.4046C70.3177 88.4046 79.2169 79.5054 79.2169 68.5274V48.2768C79.2169 43.7056 75.5113 40 70.94 40L48.1085 40.0006L48.1075 40H25.2769C20.7056 40 17 43.7056 17 48.2768V68.5274C17 79.5054 25.8992 88.4046 36.8771 88.4046H59.3399ZM68.1234 55.2323H28.0111C26.5342 55.2323 25.3369 56.4296 25.3369 57.9065V68.6031C25.3369 70.08 26.5342 71.2772 28.0111 71.2772H68.1234C69.6003 71.2772 70.7975 70.08 70.7975 68.6031V57.9065C70.7975 56.4296 69.6003 55.2323 68.1234 55.2323Z"
        fill={PRIMARY_MAIN}
      />
      <path
        d="M38.6331 60.2637L39.6524 61.737L36.9006 63.6408L39.6524 65.5448L38.6331 67.0182L36.2221 65.3502V68.2818H34.4304V65.3502L32.0193 67.0182L31 65.5448L33.7515 63.6408L31 61.737L32.0193 60.2637L34.4304 61.9316V59H36.2221V61.9316L38.6331 60.2637Z"
        fill={WARNING_DARK}
      />
      <path
        d="M51.6888 60.2637L52.7085 61.737L49.9567 63.6408L52.7085 65.5448L51.6888 67.0182L49.278 65.3502V68.2818H47.4862V65.3502L45.0754 67.0182L44.0557 65.5448L46.8075 63.6408L44.0557 61.737L45.0754 60.2637L47.4862 61.9316V59H49.278V61.9316L51.6888 60.2637Z"
        fill={WARNING_DARK}
      />
      <path
        d="M65.764 61.737L64.7445 60.2637L62.3336 61.9316V59H60.5419V61.9316L58.1309 60.2637L57.1115 61.737L59.8632 63.6408L57.1115 65.5448L58.1309 67.0182L60.5419 65.3502V68.2818H62.3336V65.3502L64.7445 67.0182L65.764 65.5448L63.0123 63.6408L65.764 61.737Z"
        fill={WARNING_DARK}
      />
      <g style={{ mixBlendMode: 'overlay' }} filter="url(#filter0_i_3223_38505)">
        <path
          d="M36.3238 29.3905V41.9535H26.7178V29.3905C26.7178 17.7136 36.1226 8.19195 47.7552 8.00268L48.1085 8C59.7856 8 69.3069 17.4049 69.4962 29.0373L69.499 29.3905V41.9535H59.8931V29.3905C59.8931 22.9575 54.7117 17.7118 48.3031 17.6075L48.1085 17.6059C41.6103 17.6059 36.3238 22.8925 36.3238 29.3905Z"
          fill="white"
          fillOpacity="0.08"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M59.3399 88.4046C70.3177 88.4046 79.2169 79.5054 79.2169 68.5274V48.2768C79.2169 43.7056 75.5113 40 70.94 40L48.1085 40.0006L48.1075 40H25.2769C20.7056 40 17 43.7056 17 48.2768V68.5274C17 79.5054 25.8992 88.4046 36.8771 88.4046H59.3399ZM68.1234 55.2323H28.0111C26.5342 55.2323 25.3369 56.4296 25.3369 57.9065V68.6031C25.3369 70.08 26.5342 71.2772 28.0111 71.2772H68.1234C69.6003 71.2772 70.7975 70.08 70.7975 68.6031V57.9065C70.7975 56.4296 69.6003 55.2323 68.1234 55.2323Z"
          fill="white"
          fillOpacity="0.08"
        />
        <path
          d="M38.6331 60.2637L39.6524 61.737L36.9006 63.6408L39.6524 65.5448L38.6331 67.0182L36.2221 65.3502V68.2818H34.4304V65.3502L32.0193 67.0182L31 65.5448L33.7515 63.6408L31 61.737L32.0193 60.2637L34.4304 61.9316V59H36.2221V61.9316L38.6331 60.2637Z"
          fill="white"
          fillOpacity="0.08"
        />
        <path
          d="M51.6888 60.2637L52.7085 61.737L49.9567 63.6408L52.7085 65.5448L51.6888 67.0182L49.278 65.3502V68.2818H47.4862V65.3502L45.0754 67.0182L44.0557 65.5448L46.8075 63.6408L44.0557 61.737L45.0754 60.2637L47.4862 61.9316V59H49.278V61.9316L51.6888 60.2637Z"
          fill="white"
          fillOpacity="0.08"
        />
        <path
          d="M65.764 61.737L64.7445 60.2637L62.3336 61.9316V59H60.5419V61.9316L58.1309 60.2637L57.1115 61.737L59.8632 63.6408L57.1115 65.5448L58.1309 67.0182L60.5419 65.3502V68.2818H62.3336V65.3502L64.7445 67.0182L65.764 65.5448L63.0123 63.6408L65.764 61.737Z"
          fill="white"
          fillOpacity="0.08"
        />
      </g>
      <defs>
        <filter
          id="filter0_i_3223_38505"
          x="15"
          y="6"
          width="64.2168"
          height="82.4045"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-2" dy="-2" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_3223_38505" />
        </filter>
      </defs>
    </Box>
  )
}

export default memo(NewPasswordIcon)
