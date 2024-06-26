import React from "react";
import { StyleSheet } from "react-native";
import { Layout, Tab, TabView, Text } from "@ui-kitten/components";
import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";

const TopTabs = ({ tabs, style }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <TabView
      selectedIndex={selectedIndex}
      onSelect={(index) => setSelectedIndex(index)}
    >
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          title={
            <Text
              style={{
                color: selectedIndex === index ? "yellow" : "black", // Thay đổi màu sắc tại đây
              }}
            >
              {tab.title}
            </Text>
          }
        >
          <Layout style={[styles.tabContainer, style]}>
            {typeof tab.content === "function" ? (
              tab.content()
            ) : (
              <Text category="h5">{tab.content}</Text>
            )}
          </Layout>
        </Tab>
      ))}
    </TabView>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TopTabs;
