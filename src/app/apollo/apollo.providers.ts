import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { createApolloOptions } from './apollo.options';

export function provideAppApollo(): EnvironmentProviders {
  return makeEnvironmentProviders([HttpLink, provideApollo(() => createApolloOptions())]);
}
