<template>
  <div class="center-container" id="content">
    <sui-grid centered class="fullwidth">
      <sui-grid-row id="title">
        <div id="icon">
          <sui-icon :name="icon" size="big"/>
        </div>
        <h2>{{title}}</h2>
      </sui-grid-row>
      <sui-grid-row id="content-list">
        <div id="search" v-if="allowSearch || allowSelectAll">
          <sui-input v-if="allowSearch" v-model="searchInput" v-on:input="onSearchChanged" style="width: 100%" placeholder="Zoeken..." icon="search" />
          <div v-if="allowSelectAll" id="select-all" v-on:click="onSelectAll">
            {{ shouldSelectAll ? 'Selecteer alles' : 'Deselecteer alles'}}
          </div>
        </div>
        <ul>
          <li
            v-for="item in sorted"
            v-bind:key="item[keyField]"
            v-on:click="onSelectChange(item)"
          >
            {{ item[displayField] }} <sui-icon v-if="isSelected(item)" style="color: #623264" name="check" />
          </li>
          <li id="empty" v-if="filtered.length < 1">
            Geen resultaten.
          </li>
        </ul>
      </sui-grid-row>
      <sui-grid-row id="bottom" v-if="(allowMultiSelect || allowSubmit) && !disableBottom">
        <div id="selected-count" v-if="allowMultiSelect">
          {{ this.selected.length > 0 ? this.selected.length : 'Geen ' }} item{{this.selected.length === 1 ? '' : 's'}}
        </div>
        <sui-button v-if="allowSubmit" v-on:click="onSelectSubmit" v-bind:class="{ disabled: selected.length < 1 }" content="Bevestigen" size="small" icon="angle right" label-position="right" />
      </sui-grid-row>
    </sui-grid>
  </div>
</template>

<script>
  import {mapActions, mapMutations, mapState} from "vuex";
  import {ADD_SELECTED_DISCIPLINE, REMOVE_SELECTED_DISCIPLINE, SET_SELECTED_DISCIPLINES} from "../../store/actions";

  export default {

    name: "DisciplineList",
    props: {
      icon: String,
      title: String,
      allowSearch: Boolean,
      allowSelectAll: Boolean,
      allowMultiSelect: {
        type: Boolean,
        default() {
          return this.allowSelectAll
        }
      },
      allowSubmit: Boolean,
      displayField: {
        type: String,
        default: 'value'
      },
      keyField: {
        type: String,
        default() {
          return this.displayField
        }
      },
      items: {
        type: Array,
        default() { return [] }
      },
      disableBottom: {
        type: Boolean,
        default() { return false; }
      }
    },
    events: [
      'selectChange',
      'selectSubmit'
    ],

    data() {
      return {
        filtered: [],
        searchInput: ""
      }
    },

    computed: {

      ...mapState('disciplines', {
        selected: state => state.selected
      }),

      sorted() {
        return [...this.filtered].sort((a,b) => (a[this.displayField] > b[this.displayField]) ? 1 : ((b[this.displayField] > a[this.displayField]) ? -1 : 0));
      },

      shouldSelectAll() {
        return !this.sorted.every((i) => this.isSelected(i));
      }

    },

    methods: {

      ...mapMutations('disciplines', {
        addSelected: ADD_SELECTED_DISCIPLINE,
        removeSelected: REMOVE_SELECTED_DISCIPLINE
      }),

      onSearchChanged() {
        setTimeout(() => {
          this.filtered = [...this.items].filter((i) => i[this.displayField].toLowerCase().includes(this.searchInput.toLowerCase()));
        }, 200);
      },

      reset() {
        this.filtered = this.items;
        this.searchInput = "";
      },

      onSelectChange(item) {
        if (this.selected.some(i => i.disciplineId === item.disciplineId)) {
          this.removeSelected(item);
        } else {
          this.addSelected(item);
          // this.setSelected([
          //   ...this.selected,
          //   item
          // ])
          // this.$emit('selectChange', {
          //   item,
          //   deselect: false
          // });
        }
      },

      onSelectSubmit() {
        this.$emit('selectSubmit', this.selected);
      },

      isSelected(item) {
        return this.selected.some(i => i[this.keyField] === item[this.keyField])
      },

      onSelectAll() {

        if (this.shouldSelectAll) {
          this.filtered.forEach((item) => {
            if (!this.isSelected(item)) {
              this.addSelected(item)
            }
          });
        } else {
          this.filtered.forEach((item) => {
            if (this.isSelected(item)) {
              this.removeSelected(item)
            }
          })
        }

      }

    },

    beforeMount() {
      this.reset();
    },

    watch: {
      items() {
        this.reset();
      }
    }

  }
</script>

<style scoped>

  #content {
    background: #f9f9f9;
    padding-top: 24px !important;
  }

  ::-webkit-scrollbar {
    display: block !important;
  }

  #icon {
    color: #623264;
    width: 100%;
    display: flex;
    justify-content: center;
    height: auto;
    flex: 1 1 auto;
  }

  h2 {
    margin: 0 !important;
  }

  ul {
    list-style-type: none;
    margin: 0 !important;
    padding: 0 !important;
    width: 100%;
  }

  li {
    padding: 10px 10px 10px 16px;
    cursor: default;
    text-align: left;
  }

  li:hover, li.selected {
    background: rgba(0, 0, 0, 0.03);
  }

  #search {
    width: 100%;
    background: transparent !important;
    margin-right: 12px;
    margin-left: 12px;
    /*margin-bottom: 12px;*/
  }

  #select-all {
    width: 100%;
    color: #8a478d;
    text-align: right;
    margin-top: 4px;
  }

  #select-all:hover {
    color: #623264;
  }

  #empty {
    color: rgba(0,0,0,0.51);
  }

  #content-list {
    padding-bottom: 0 !important;
  }

  #content-list ul {
    height: 300px;
    overflow-y: scroll;
    scroll-padding: 10px !important;
  }

  i {
    float: right !important;
  }

  #bottom {
    bottom: 0 !important;
    display: flex;
    width: 100% !important;
    background: rgba(0, 0, 0, 0.04);
    color: rgba(0,0,0,0.74) !important;
  }

  #bottom .divider {
    width: 100%;
    margin: 0;
  }

  #selected-count {
    color: rgb(125, 125, 125);
    margin: 8px !important;
    margin-left: 16px !important;
    align-self: center !important;
    cursor: default !important;
  }

  #bottom div, i {
    padding: 0 !important;
  }

  #bottom i {
    align-self: center !important;
    margin-bottom: 6px !important;
    margin-left: 32px !important;
  }

  #bottom .button {
    background-color: rgba(98, 50, 100, 0.88);
    color: white;
    right: 0 !important;
    width: auto !important;
    margin: 8px !important;
    margin-left: auto !important;
  }

  #bottom .disabled {
    background-color: rgb(112, 111, 111) !important;
  }

  #bottom .button:hover {
    background-color: #623264;
  }

  .fullwidth {
    height: 100%;
  }

</style>