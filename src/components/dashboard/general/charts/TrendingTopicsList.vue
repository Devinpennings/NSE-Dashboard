<template>
  <div class="fullHeight wrapper">
    <div v-for="topic in result.topics.slice(0, 5)" v-bind:key="topic.name" class="list-item-outer">
      <div class="list-item" v-on:mousedown="onTopicClick(topic)">
        <div class="comment-count">
          <sui-icon name="comment outline"/>
          {{topic.contributedSentences.length}}
        </div>
        {{topic.value}}
        <sui-icon class="extender" name="angle right"/>
      </div>
    </div>
    <div class="list-item-last">
      Alle onderwerpen
      <sui-icon name="angle right"/>
    </div>
  </div>
</template>

<script>
  import {FETCH_TOPICS} from "../../../../store/actions";
  import {mapActions, mapState} from "vuex";

  export default {
    name: "TrendingTopicsList",
    computed: {
      ...mapState('results', {
        result: 'selected'
      })
    },
    methods: {
      ...mapActions('topics', {
        getTopics: FETCH_TOPICS,
      }),
      onTopicClick(topic) {
        this.$router.push('/dashboard/topic/' + topic.topicId)
      },
      toggleRateUp(sentence) {
        sentence.rating = sentence.rating === 1 ? 0 : 1
      },
      toggleRateDown(sentence) {
        sentence.rating = sentence.rating === -1 ? 0 : -1
      },
      getThumpsUpIcon(sentence) {
        return sentence.rating === 1 ? 'thumbs up' : 'thumbs up outline'
      },
      getThumpsDownIcon(sentence) {
        return sentence.rating === -1 ? 'thumbs down' : 'thumbs down outline'
      }
    },
    beforeMount() {
      // this.getTopics().then((result) => {
      //   this.topics = result;
      //   this.topics =  this.topics.map((t) => {
      //     return {
      //       ...t,
      //       extended: false,
      //       sentences: t.sentences.map((s) => {
      //         return {
      //           ...s,
      //           extended: false
      //         }
      //       })
      //     }
      //   });
      // });
    }
  }
</script>

<style scoped>

  .wrapper {
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
  }

  .list-item-outer {
    border-bottom: #c7c7c7 1px solid;
  }

  .list-item {
    color: #5b5b5b;
    position: relative;
    font-family: 'Roboto', sans-serif;
    padding: 24px 36px;
  }

  .list-item:hover {
    background-color: #f7f7f7;
  }

  .list-item:hover::before {
    content: "";
    display: inline-block;
    width: 2px;
    height: 100%;
    background-color: #EF5B70;
    left: 0;
    top: 0;
    position: absolute;
  }

  .list-item-last {
    text-align: right;
    padding: 12px 12px 12px 36px;
    border-bottom: 0;
    font-family: 'Roboto', sans-serif;
    color: #5b5b5b;
    background-color: white;
    height: 100%;
  }

  .list-item-last:hover {
    color: #353535;
  }

  .comment-count {
    display: inline-block;
    margin-right: 16px;
    min-width: 50px !important;
    font-size: 14px;
  }

  .comment-count i {
    margin-right: 0 !important;
  }

  .extender {
    float: right;
  }

  .extension {
    background-color: rgb(243, 243, 243);
  }

  .sentence {
    font-family: 'Roboto', sans-serif;
    color: #525252;
    /*border-bottom: #c7c7c7 1px solid;*/
    padding: 12px 36px;
  }

  .sentence-text {
    width: 90%;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    min-width: 0;
    table-layout: fixed;
  }

  .extended {
    white-space: normal;
    overflow: auto;
  }

  .rating {
    float: right;
    display: inline-block;
  }

  .odd {
    background-color: #eaeaea;
  }

</style>