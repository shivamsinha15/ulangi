/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import { Theme } from '@ulangi/ulangi-common/enums';
import { Attribution } from '@ulangi/ulangi-common/interfaces';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

import { Images } from '../../constants/Images';
import { PublicSetDetailScreenIds } from '../../constants/ids/PublicSetDetailScreenIds';
import { DefaultText } from '../common/DefaultText';
import {
  PublicSetDetailHeaderStyles,
  darkStyles,
  lightStyles,
} from './PublicSetDetailHeader.style';

export interface PublicSetDetailHeaderProps {
  theme: Theme;
  title: string;
  subtitle?: string;
  numberOfTerms: number;
  attributions: Attribution[];
  openLink: (link: string) => void;
  addAllVocabulary: () => void;
  styles?: {
    light: PublicSetDetailHeaderStyles;
    dark: PublicSetDetailHeaderStyles;
  };
}

@observer
export class PublicSetDetailHeader extends React.Component<
  PublicSetDetailHeaderProps
> {
  public get styles(): PublicSetDetailHeaderStyles {
    const light = this.props.styles ? this.props.styles.light : lightStyles;
    const dark = this.props.styles ? this.props.styles.dark : darkStyles;
    return this.props.theme === Theme.LIGHT ? light : dark;
  }

  public render(): React.ReactElement<any> {
    return (
      <View style={this.styles.container}>
        <View style={this.styles.left}>
          <DefaultText style={this.styles.attributions}>
            This content is created by{' '}
            {this.props.attributions.map(
              (attribution, index): React.ReactElement<any> => {
                return this.renderAttribution(attribution, index);
              },
            )}
          </DefaultText>
          <DefaultText style={this.styles.term_count}>{`${
            this.props.numberOfTerms
          } terms`}</DefaultText>
        </View>
        <View style={this.styles.right}>{this.renderAddAllButton()}</View>
      </View>
    );
  }

  private renderAttribution(
    attribution: Attribution,
    index: number,
  ): React.ReactElement<any> {
    return (
      <DefaultText key={attribution.sourceName}>
        {index > 0 ? ', ' : ''}
        <DefaultText
          style={attribution.sourceLink ? this.styles.highlighted : null}
          onPress={(): void => {
            if (typeof attribution.sourceLink !== 'undefined') {
              this.props.openLink(attribution.sourceLink);
            }
          }}>
          {attribution.sourceName}
        </DefaultText>
      </DefaultText>
    );
  }

  private renderAddAllButton(): React.ReactElement<any> {
    return (
      <TouchableOpacity
        testID={PublicSetDetailScreenIds.ADD_ALL_BTN}
        style={this.styles.add_all_btn}
        onPress={this.props.addAllVocabulary}>
        <Image
          style={this.styles.add_all_plus}
          source={
            this.props.theme === Theme.LIGHT
              ? Images.ADD_BLACK_16X16
              : Images.ADD_MILK_16X16
          }
        />
        <DefaultText style={this.styles.add_all_text}>ALL</DefaultText>
      </TouchableOpacity>
    );
  }
}
