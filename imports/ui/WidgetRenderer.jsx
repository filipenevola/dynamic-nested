import React, {useState, Suspense, lazy} from 'react';

const Loading = () => <div>loading</div>;

// TODO workaround for https://github.com/facebook/react/issues/14188
// should be fixed on next release of react, after 16.8.6
export const wrapSuspense = LazyComponent => props => (
  <Suspense fallback={<Loading/>}>
    <LazyComponent {...props} />
  </Suspense>
);

export const WidgetsTypes = {
  Info1: 'Info1',
  Info2: 'Info2',
};


export default  () =>{

  const [widgetType, setWidgetType] = useState(WidgetsTypes.Info1);
    const widgetsByType = {
      [WidgetsTypes.Info1]() {
        return wrapSuspense(lazy(() => import('./Info1')));
      },
      [WidgetsTypes.Info2]() {
        import Info2 from './Info2';

        return Info2;
      },
    };
    const Widget = widgetsByType[widgetType]();
    return (
      <div onClick={() => setWidgetType(widgetType === WidgetsTypes.Info1 ? WidgetsTypes.Info2 : WidgetsTypes.Info1)}>
        <Widget />
      </div>
    );
}
