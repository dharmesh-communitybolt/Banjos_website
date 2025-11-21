import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  useColorModes,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import {
  cilContrast,
  cilMenu,
  cilMoon,
  cilSun,
  cilLanguage,
  cifGb,
  cifEs,
  cifPl,
} from '@coreui/icons'

import {
  AppHeaderDropdown,
  AppHeaderDropdownNotif,
} from './header/index'

const AppHeader = () => {
  const headerRef = useRef()
  const { colorMode, setColorMode } = useColorModes('coreui-pro-react-admin-template-theme-bright')
  const { i18n, t } = useTranslation()

  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  useEffect(() => {
    document.addEventListener('scroll', () => {
      if (headerRef.current) {
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
      }
    })
  }, [])

  return (
    <CHeader position="sticky" className=" mb-4 p-0" style={{ backgroundColor: 'black' , height: '79px'}} ref={headerRef}>
      <CContainer className="px-4" fluid>
        <CHeaderToggler
          className={classNames('d-lg-none')}
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          style={{ marginInlineStart: '-14px' }}
        >
          <CIcon icon={cilMenu} size="lg" style={{ color: 'white' }} />
        </CHeaderToggler>

        <CHeaderNav className="d-none d-md-flex ms-auto">
          <AppHeaderDropdownNotif />
        </CHeaderNav>

        <CHeaderNav className="ms-auto ms-md-0 text-dark">
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 bg-dark opacity-25"></div>
          </li>

          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              {/* <CIcon icon={cilLanguage} size="lg" style={{ color: 'white' }} /> */}
            </CDropdownToggle>
            <CDropdownMenu className="text-dark">
              <CDropdownItem
                active={i18n.language === 'en'}
                className="d-flex align-items-center text-dark"
                as="button"
                onClick={() => i18n.changeLanguage('en')}
              >
                <CIcon className="me-2" icon={cifGb} size="lg" style={{ color: 'white' }} /> English
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>

          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              {colorMode === 'dark' ? (
                <CIcon icon={cilMoon} size="lg" style={{ color: 'red' }} />
              ) : colorMode === 'auto' ? (
                <CIcon icon={cilContrast} size="lg" style={{ color: 'gray' }} />
              ) : (
                <CIcon icon={cilSun} size="lg" style={{ color: 'yellow' }} />
              )}
            </CDropdownToggle>
            <CDropdownMenu className="text-dark">
              <CDropdownItem
                active={colorMode === 'light'}
                className="d-flex align-items-center text-dark"
                as="button"
                type="button"
                onClick={() => setColorMode('light')}
              >
                <CIcon className="me-2" icon={cilSun} size="lg" style={{ color: 'black' }} />
                {t('light')}
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'dark'}
                className="d-flex align-items-center text-dark"
                as="button"
                type="button"
                onClick={() => setColorMode('dark')}
              >
                <CIcon className="me-2" icon={cilMoon} size="lg" style={{ color: 'black' }} />
                {t('dark')}
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'auto'}
                className="d-flex align-items-center text-dark"
                as="button"
                type="button"
                onClick={() => setColorMode('auto')}
              >
                <CIcon className="me-2" icon={cilContrast} size="lg" style={{ color: 'black' }} />
                Auto
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>

          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 bg-dark opacity-25"></div>
          </li>

          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
