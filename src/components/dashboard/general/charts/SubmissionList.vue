<template>
  <div>
    <sui-card-group :items-per-row="1">
      <sui-card v-for="submission in submissions" v-bind:key="submission.value">
        <sui-card-content>
          <sui-card-header>Elliot Fu</sui-card-header>
          <sui-card-meta>Friend</sui-card-meta>
          <sui-card-description>{{submission.value}}</sui-card-description>
        </sui-card-content>
      </sui-card>
    </sui-card-group>
  </div>


</template>

<script>
  export default {
    name: "SubmissionList",
    data() {
      return {
        submissions: [
          {
            value: 'Ik vind de docenten van wiskunde heel slim.',
            year: 2013,
            institute: 'Fontys Journalistiek'
          },
          {
            value: 'De open ruimtes zijn heel fijn.',
            year: 2014,
            institute: 'Fontys ICT'
          },
          {
            value: 'De begeleiders van ADS zijn heel aardig en behulpzaam.',
            year: 2014,
            institute: 'Fontys ICT'
          },
          {
            value: 'Lekkere broodjes in de kantine zeg.',
            year: 2017,
            institute: 'Fontys Werktuigbouwkunde'
          },
          {
            value: 'Posters maken is meer iets voor een media opleiding.',
            year: 2017,
            institute: 'Fontys ICT'
          },
        ]
      }
    }
  }
</script>

<style scoped>

  .list-item {
    border-bottom: #c7c7c7 1px solid;
    padding: 24px 36px;
    color: #5b5b5b;
    position: relative;
    font-family: 'Roboto', sans-serif;
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
  }

  .list-item-last:hover {
    color: #353535;
  }

  .submission {
    font-style: italic;
    margin-bottom: 4px;
  }

  .submission::before {
    content: "❝";
  }

  .submission::after {
    content: "❞";
  }

</style>