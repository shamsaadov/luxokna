import type { Metadata } from 'next'
import './styles/tokens.css'
import './styles/reset.css'
import './styles/globals.css'
import './styles/aliases.css'
import { fraunces, switzer, jbm } from './styles/fonts'
import { Chrome } from './_chrome'
import { localBusinessJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'LuxOkna',
  description: 'Окна, двери, витражи в Грозном',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ymId = process.env.NEXT_PUBLIC_YM_ID
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  return (
    <html lang="ru" className={`${fraunces.variable} ${switzer.variable} ${jbm.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
        />
        <Chrome section="00 / HOME">{children}</Chrome>
        {ymId && (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
ym(${ymId}, "init", {clickmap:true, trackLinks:true, accurateTrackBounce:true});`,
              }}
            />
            <noscript>
              <div>
                <img
                  src={`https://mc.yandex.ru/watch/${ymId}`}
                  style={{ position: 'absolute', left: '-9999px' }}
                  alt=""
                />
              </div>
            </noscript>
          </>
        )}
        {gaId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`,
              }}
            />
          </>
        )}
      </body>
    </html>
  )
}
