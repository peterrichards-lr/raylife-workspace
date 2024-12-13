import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { UkDateControlledInput } from '../../connectors/Controlled/Input/WithMask/UkDate';
import useMobileContainer from '../../../hooks/useMobileContainer';
import { SUBSECTION_KEYS } from '../../../utils/constants';
import MobileContainer from '../../mobile/MobileContainer';
import moment from 'moment';
import { TermsAndConditions } from './TermsAndConditions';

const setFormPath = (value) => `terms.${value}`;

export function FormTerms({ form, isMobile }) {
  const { control } = useFormContext();
  const { getMobileSubSection, mobileContainerProps } = useMobileContainer();
  const { t } = useTranslation();

  return (
    <div className="p-0">
      <MobileContainer
        {...mobileContainerProps}
        mobileSubSection={getMobileSubSection(SUBSECTION_KEYS.DOB)}
      >
        <div className="mb3">
          <UkDateControlledInput
            control={control}
            inputProps={{
              className: classNames('flex-grow-1 p-0 mb-4', {
                'col-12 mb-4': isMobile,
              }),
            }}
            label={t(SUBSECTION_KEYS.DOB)}
            name={setFormPath('dob')}
            rules={{
              required: t('field-required'),
              validate: {
                minDate: (date) => {
                  return (
                    moment(date, 'DD/MM/YYYY').isBefore(
                      moment().subtract(13, 'years')
                    ) || t('must-be-thirteen-or-over')
                  );
                },
              },
            }}
          />
          <p className="mt-1 paragraph">{t('dob-hint')}</p>
        </div>
      </MobileContainer>

      <MobileContainer
        {...mobileContainerProps}
        mobileSubSection={getMobileSubSection(SUBSECTION_KEYS.TERMS)}
      >
        <TermsAndConditions
          required={true}
          label={t('terms-and-conditions')}
          acceptanceLabel={t('acceptance-statement')}
          name={setFormPath('acceptTerms')}
          style={{ height: '200px', border: '1px solid rgba(0, 0, 0, 0.05)' }}
        >
          <p>
            Lorem ipsum odor amet, consectetuer adipiscing elit. Eget quis
            placerat mollis ante lectus. Purus platea molestie mauris tristique
            blandit penatibus vivamus! Accumsan dolor metus sollicitudin quis
            quisque tristique. Blandit parturient gravida facilisis urna risus
            neque phasellus convallis consectetur. Dis dapibus sed venenatis
            blandit conubia velit. Porttitor elit integer phasellus arcu
            pulvinar ad non tellus mollis. Vitae ullamcorper mi, maximus rhoncus
            eleifend at eu montes. Duis volutpat rutrum, condimentum tortor
            dictum dui sit. Cubilia sociosqu pulvinar ullamcorper tortor a
            consectetur pulvinar mi. Diam mollis consequat nec platea curabitur
            nec felis nisl penatibus. Feugiat non dictum class cubilia, dictum
            suscipit elementum vestibulum ad. Gravida vivamus fringilla
            habitasse sapien nisl. Interdum orci ante lacinia egestas posuere
            finibus aenean orci. Hac conubia fusce turpis semper, dictumst
            donec. Id adipiscing mollis justo facilisi ad magna maximus hac ad.
            Netus aenean luctus duis dignissim turpis nec consectetur a. Taciti
            vehicula congue etiam volutpat hendrerit a. Lacus in nulla
            consectetur, montes sodales cursus. Commodo laoreet nisl tempus
            dictum accumsan efficitur facilisis penatibus. Varius efficitur ante
            habitasse hac ultrices id hac. Tempus tempus odio luctus habitant
            ultricies varius ullamcorper. Vel hac eget accumsan dui ultricies
            dictum iaculis erat? Libero lobortis dictum adipiscing potenti
            cursus pulvinar nostra. Odio id iaculis dolor diam ex vitae. Feugiat
            class primis ridiculus aliquam facilisis erat sapien nisl.
            Ullamcorper curabitur semper nostra eros phasellus ac ligula netus.
            Sit sagittis congue nullam mauris et. Habitant dignissim tristique
            efficitur pretium tempus. Pharetra mattis duis efficitur ad mauris
            justo class imperdiet. Molestie rhoncus sem ad congue commodo. Donec
            amet interdum pellentesque eu; nam dui. Ante vulputate tempor in
            feugiat egestas lorem mus erat. Varius vulputate id, magna eleifend
            sagittis hendrerit convallis ultricies tincidunt. Sociosqu class id
            fames aliquet montes; aliquam sem! Cursus imperdiet ligula bibendum
            turpis cras hac torquent. Adipiscing tortor laoreet sollicitudin
            habitant id ex iaculis. Sapien posuere ipsum volutpat sit nascetur
            aenean. Facilisi facilisi maximus habitant malesuada felis mi
            viverra placerat primis. Pretium ligula quam pharetra tincidunt;
            torquent convallis. Vel per taciti phasellus; risus dolor senectus
            dui sodales neque. Aliquet finibus amet hendrerit porttitor, euismod
            pharetra nulla. Mattis est vel; nam tempor neque in ad himenaeos.
            Auctor sagittis ultrices consectetur nibh scelerisque litora.
            Accumsan facilisis pharetra lacinia massa sed enim. Vestibulum
            natoque eu est tempus litora ante. Vehicula maximus nec praesent,
            inceptos nascetur amet congue ligula. Euismod nullam bibendum,
            suspendisse sodales mollis dignissim vitae fames. Risus bibendum
            magna rutrum lobortis sociosqu tortor platea malesuada euismod. Non
            nec accumsan feugiat vulputate euismod aliquam dictum. Nisl ex dis
            habitasse ipsum consequat inceptos augue. Vel venenatis lobortis;
            malesuada lacus purus ridiculus. Dictum auctor ipsum sodales netus
            senectus gravida tempus. Egestas magna tellus ante leo bibendum.
            Habitasse maecenas adipiscing, libero amet arcu ullamcorper. Nunc
            elementum curabitur cursus a mi duis massa. Fames cursus rhoncus
            torquent enim semper aptent commodo efficitur. Molestie tempus
            parturient vestibulum imperdiet condimentum ridiculus maecenas.
            Iaculis sapien rhoncus commodo hendrerit risus conubia. Urna feugiat
            mattis ex sagittis consequat netus dui. Bibendum lectus eleifend
            lacus dapibus tortor urna. Aptent diam porta interdum porttitor
            rutrum tellus fringilla. Porttitor dui aenean sem ad auctor ornare
            class. Cras ridiculus condimentum aptent phasellus malesuada
            habitant quam tincidunt. Justo neque proin rhoncus gravida porta;
            nam hendrerit? Rutrum nisl lobortis penatibus egestas laoreet
            efficitur purus justo. Magna dignissim rhoncus cursus porta
            vestibulum. Rhoncus fames dui lacus dis justo fames est ligula
            semper. Et praesent curae taciti urna suscipit justo elit elit.
            Curae bibendum porta velit luctus vel; adipiscing faucibus. Massa
            magna euismod montes habitasse volutpat conubia lobortis maecenas.
            Volutpat facilisis eget leo tristique netus ipsum magnis sapien
            primis. Dolor praesent tempus elementum habitasse suscipit inceptos.
            Nec tempor eleifend curae turpis gravida urna maecenas sem. Eu
            vehicula nibh accumsan elit duis. Enim malesuada rutrum morbi amet
            hac dui pharetra id enim. Aliquam quam amet tempus sagittis
            ridiculus aliquet magna fermentum. Ac ultrices vivamus dictum
            tincidunt torquent. Tempus gravida vestibulum molestie orci vivamus
            congue erat. Ornare libero euismod mus habitasse lacinia eleifend
            odio magnis accumsan. Quisque at malesuada amet tellus dapibus magna
            donec accumsan. Mi nostra semper dictumst sapien nam at magna
            tincidunt. Quis ligula habitasse vestibulum iaculis; adipiscing
            placerat finibus. Arcu velit eros suspendisse non finibus magnis
            ante luctus dignissim? Commodo potenti vivamus eget bibendum;
            habitasse lobortis elit iaculis. Aenean consectetur eu tortor nulla
            velit vulputate? Sed mus luctus purus gravida rhoncus vestibulum
            sapien. Ligula etiam auctor aptent morbi mauris laoreet semper. Sit
            montes et aenean auctor suscipit faucibus gravida tempus ornare.
            Nisl fermentum libero feugiat litora, laoreet faucibus pharetra.
            Magnis vitae eu proin orci nec molestie sociosqu. Etiam ultrices
            pellentesque posuere taciti odio nascetur; fermentum vulputate nisl.
            Netus aliquet semper, placerat felis convallis ut. Lectus hendrerit
            ut leo, per hac nec. Vel elementum habitasse scelerisque ex turpis.
            Felis magnis nascetur finibus nullam cursus dignissim dolor. Mauris
            gravida eros praesent; imperdiet netus urna risus. Rutrum ut ante
            efficitur parturient consequat nullam facilisi convallis. Venenatis
            cubilia nisl amet natoque; urna euismod ipsum platea est. Felis
            netus viverra mi inceptos ultrices a nascetur efficitur. Tempus
            gravida mattis dis tortor integer auctor ornare aptent. Aptent
            ultricies aptent aenean ullamcorper montes duis massa. Euismod
            fermentum dapibus duis felis risus nulla dis. In nec etiam, lacinia
            molestie quisque nibh. Varius ante sagittis massa aliquet fermentum
            duis etiam. Tellus non in orci suspendisse; iaculis dui aliquet.
            Urna nec netus euismod lobortis enim a non. Lacus eu congue per
            libero nascetur auctor sapien dictumst accumsan. Blandit penatibus
            odio ex lacus maecenas mollis curae semper? Mus blandit quis elit,
            aliquam congue imperdiet. Vitae massa nullam duis fermentum nec
            egestas congue. Penatibus quis cras, malesuada proin adipiscing
            cursus commodo natoque mi. Nisi mollis habitant maximus nec; eros
            senectus fermentum. Penatibus sit eget pulvinar posuere pellentesque
            proin litora imperdiet netus. Ad consequat consectetur at; cubilia
            quisque aenean maecenas sagittis congue. Nam ipsum nibh nibh blandit
            dignissim phasellus; vulputate augue. Laoreet ex erat turpis
            tincidunt donec feugiat ipsum tristique porta. Augue nisi tempus
            faucibus montes mauris platea. Purus blandit ultricies vel nibh
            maximus dolor. Penatibus maecenas ex velit interdum fames inceptos
            scelerisque non cursus. Velit nascetur per sit placerat vel vel
            lectus. Auctor arcu laoreet molestie gravida duis vitae blandit.
            Volutpat adipiscing per suspendisse lacinia mattis praesent class
            cubilia non. Platea efficitur cubilia quis, eleifend leo est
            condimentum. Habitant mollis ut eu curabitur semper cursus. Augue
            litora gravida fringilla class; sed volutpat ultricies ultricies.
            Vivamus condimentum venenatis nec nullam rhoncus eu. Dis adipiscing
            ultrices vehicula felis aliquet primis lacinia. Consequat fringilla
            curabitur curabitur dui quisque. Tincidunt praesent penatibus id
            convallis aenean semper hac curabitur. Porta consectetur taciti
            vehicula tincidunt ante vestibulum ad. Dignissim conubia sed aliquam
            et; fames laoreet laoreet quisque blandit. Odio vel commodo fusce
            blandit placerat. At non facilisi habitant varius ut aliquam.
            Elementum rhoncus aenean sem; dapibus vel orci. Cras penatibus proin
            curabitur maecenas natoque porta habitasse. Eleifend dui interdum
            ipsum lacus fringilla volutpat cras etiam habitasse. Maecenas
            dapibus commodo quam ex blandit taciti montes risus. Montes
            suspendisse vestibulum aliquet donec suspendisse ac. Metus vel
            primis pellentesque vulputate pharetra ad. Odio nullam etiam
            suscipit magnis; diam nam curabitur. Ut neque elit risus dictumst
            cras efficitur. Nascetur arcu taciti natoque morbi enim pretium dis.
            Laoreet est nec ut rhoncus posuere senectus. Convallis tempor dolor
            purus rutrum, fusce lectus senectus. Sagittis egestas luctus orci
            vehicula eleifend eu varius arcu rutrum. Porttitor dapibus quisque
            dignissim leo venenatis aliquet semper. Commodo cras per quis
            adipiscing, imperdiet suscipit platea ullamcorper taciti? Mollis mi
            blandit nam netus ac diam. Odio tempus ornare integer molestie mi.
            Interdum nisi non facilisi cubilia sodales placerat. Imperdiet
            curabitur nostra eros morbi sollicitudin tortor neque tortor. Massa
            hac parturient inceptos ac hac venenatis sed ex. Ligula lacinia
            rhoncus aenean pharetra non diam posuere molestie. Nisl massa sed
            dolor pulvinar vel. Ante etiam odio eget lacinia consequat placerat
            ligula. Aenean phasellus primis; auctor sapien dictumst sit. Posuere
            interdum curae risus nam pharetra sociosqu neque nibh? Et est
            venenatis habitant amet nec tortor vivamus vulputate integer.
          </p>
        </TermsAndConditions>
      </MobileContainer>
    </div>
  );
}
